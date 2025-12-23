-- Create enum types for the platform
CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'manager', 'sales_rep', 'viewer');
CREATE TYPE public.deal_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE public.deal_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.activity_type AS ENUM ('call', 'email', 'meeting', 'demo', 'follow_up', 'note', 'task');
CREATE TYPE public.lead_source AS ENUM ('website', 'referral', 'cold_call', 'linkedin', 'trade_show', 'advertisement', 'partner', 'other');
CREATE TYPE public.industry_type AS ENUM ('it_services', 'saas', 'manufacturing', 'pharma', 'fmcg', 'bfsi', 'retail', 'healthcare', 'education', 'real_estate', 'logistics', 'telecom', 'energy', 'other');
CREATE TYPE public.company_size AS ENUM ('startup', 'small', 'medium', 'large', 'enterprise');
CREATE TYPE public.currency_type AS ENUM ('INR', 'USD', 'EUR', 'GBP');

-- Organizations table (multi-tenant)
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    industry industry_type DEFAULT 'other',
    website TEXT,
    gst_number TEXT,
    pan_number TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    country TEXT DEFAULT 'India',
    default_currency currency_type DEFAULT 'INR',
    fiscal_year_start INTEGER DEFAULT 4,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles table linked to auth.users
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    designation TEXT,
    department TEXT,
    employee_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Organization members (links users to organizations with roles)
CREATE TABLE public.organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'sales_rep',
    is_active BOOLEAN DEFAULT true,
    joined_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, user_id)
);

-- Contacts/Leads table
CREATE TABLE public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    company_name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    alternate_phone TEXT,
    designation TEXT,
    industry industry_type DEFAULT 'other',
    company_size company_size DEFAULT 'medium',
    website TEXT,
    linkedin_url TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    country TEXT DEFAULT 'India',
    gst_number TEXT,
    lead_source lead_source DEFAULT 'website',
    assigned_to UUID REFERENCES public.profiles(id),
    tags TEXT[],
    notes TEXT,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Deals/Opportunities table
CREATE TABLE public.deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    value DECIMAL(15, 2) DEFAULT 0,
    currency currency_type DEFAULT 'INR',
    stage deal_stage DEFAULT 'lead',
    priority deal_priority DEFAULT 'medium',
    probability INTEGER DEFAULT 20 CHECK (probability >= 0 AND probability <= 100),
    expected_close_date DATE,
    actual_close_date DATE,
    product_category TEXT,
    assigned_to UUID REFERENCES public.profiles(id),
    created_by UUID REFERENCES public.profiles(id),
    lost_reason TEXT,
    won_amount DECIMAL(15, 2),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Activities table
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
    activity_type activity_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    is_completed BOOLEAN DEFAULT false,
    outcome TEXT,
    created_by UUID REFERENCES public.profiles(id),
    assigned_to UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sales targets table
CREATE TABLE public.sales_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL DEFAULT 'monthly',
    target_month INTEGER,
    target_quarter INTEGER,
    target_year INTEGER NOT NULL,
    revenue_target DECIMAL(15, 2) DEFAULT 0,
    deals_target INTEGER DEFAULT 0,
    calls_target INTEGER DEFAULT 0,
    meetings_target INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, user_id, target_type, target_month, target_quarter, target_year)
);

-- Automation rules table
CREATE TABLE public.automation_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    trigger_type TEXT NOT NULL,
    trigger_conditions JSONB DEFAULT '{}',
    action_type TEXT NOT NULL,
    action_config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Email templates table
CREATE TABLE public.email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    category TEXT,
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products/Services catalog
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    base_price DECIMAL(15, 2) DEFAULT 0,
    currency currency_type DEFAULT 'INR',
    hsn_code TEXT,
    gst_rate DECIMAL(5, 2) DEFAULT 18.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Deal products (many-to-many)
CREATE TABLE public.deal_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(15, 2) DEFAULT 0,
    discount_percent DECIMAL(5, 2) DEFAULT 0,
    gst_rate DECIMAL(5, 2) DEFAULT 18.00,
    total_amount DECIMAL(15, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check organization membership
CREATE OR REPLACE FUNCTION public.is_org_member(_user_id UUID, _org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE user_id = _user_id AND organization_id = _org_id AND is_active = true
    )
$$;

-- Helper function to check if user has specific role in org
CREATE OR REPLACE FUNCTION public.has_org_role(_user_id UUID, _org_id UUID, _roles app_role[])
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.organization_members
        WHERE user_id = _user_id 
        AND organization_id = _org_id 
        AND role = ANY(_roles)
        AND is_active = true
    )
$$;

-- Get user's current organization
CREATE OR REPLACE FUNCTION public.get_user_org_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT organization_id FROM public.organization_members
    WHERE user_id = _user_id AND is_active = true
    LIMIT 1
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Org members can view colleague profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members om1
            JOIN public.organization_members om2 ON om1.organization_id = om2.organization_id
            WHERE om1.user_id = auth.uid() AND om2.user_id = profiles.id
        )
    );

-- RLS Policies for organizations
CREATE POLICY "Members can view their organization" ON public.organizations
    FOR SELECT USING (public.is_org_member(auth.uid(), id));

CREATE POLICY "Owners and admins can update organization" ON public.organizations
    FOR UPDATE USING (public.has_org_role(auth.uid(), id, ARRAY['owner', 'admin']::app_role[]));

CREATE POLICY "Anyone can create organization" ON public.organizations
    FOR INSERT WITH CHECK (true);

-- RLS Policies for organization_members
CREATE POLICY "Members can view org members" ON public.organization_members
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Owners and admins can manage members" ON public.organization_members
    FOR ALL USING (public.has_org_role(auth.uid(), organization_id, ARRAY['owner', 'admin']::app_role[]));

CREATE POLICY "Users can insert themselves as owner" ON public.organization_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for contacts
CREATE POLICY "Org members can view contacts" ON public.contacts
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can create contacts" ON public.contacts
    FOR INSERT WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can update contacts" ON public.contacts
    FOR UPDATE USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Managers+ can delete contacts" ON public.contacts
    FOR DELETE USING (public.has_org_role(auth.uid(), organization_id, ARRAY['owner', 'admin', 'manager']::app_role[]));

-- RLS Policies for deals
CREATE POLICY "Org members can view deals" ON public.deals
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can create deals" ON public.deals
    FOR INSERT WITH CHECK (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can update deals" ON public.deals
    FOR UPDATE USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Managers+ can delete deals" ON public.deals
    FOR DELETE USING (public.has_org_role(auth.uid(), organization_id, ARRAY['owner', 'admin', 'manager']::app_role[]));

-- RLS Policies for activities
CREATE POLICY "Org members can view activities" ON public.activities
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can manage activities" ON public.activities
    FOR ALL USING (public.is_org_member(auth.uid(), organization_id));

-- RLS Policies for sales_targets
CREATE POLICY "Org members can view targets" ON public.sales_targets
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Managers+ can manage targets" ON public.sales_targets
    FOR ALL USING (public.has_org_role(auth.uid(), organization_id, ARRAY['owner', 'admin', 'manager']::app_role[]));

-- RLS Policies for automation_rules
CREATE POLICY "Org members can view automations" ON public.automation_rules
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Admins can manage automations" ON public.automation_rules
    FOR ALL USING (public.has_org_role(auth.uid(), organization_id, ARRAY['owner', 'admin']::app_role[]));

-- RLS Policies for email_templates
CREATE POLICY "Org members can view templates" ON public.email_templates
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org members can manage templates" ON public.email_templates
    FOR ALL USING (public.is_org_member(auth.uid(), organization_id));

-- RLS Policies for products
CREATE POLICY "Org members can view products" ON public.products
    FOR SELECT USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (public.has_org_role(auth.uid(), organization_id, ARRAY['owner', 'admin']::app_role[]));

-- RLS Policies for deal_products
CREATE POLICY "Org members can view deal products" ON public.deal_products
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.deals d WHERE d.id = deal_id AND public.is_org_member(auth.uid(), d.organization_id))
    );

CREATE POLICY "Org members can manage deal products" ON public.deal_products
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.deals d WHERE d.id = deal_id AND public.is_org_member(auth.uid(), d.organization_id))
    );

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (public.is_org_member(auth.uid(), organization_id));

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_sales_targets_updated_at BEFORE UPDATE ON public.sales_targets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_automation_rules_updated_at BEFORE UPDATE ON public.automation_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_email_templates_updated_at BEFORE UPDATE ON public.email_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.deals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activities;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;