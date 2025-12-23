import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type Organization = Tables<'organizations'>;
type OrganizationMember = Tables<'organization_members'>;
type Profile = Tables<'profiles'>;

interface OrganizationContextType {
  organization: Organization | null;
  membership: OrganizationMember | null;
  profile: Profile | null;
  loading: boolean;
  refetch: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [membership, setMembership] = useState<OrganizationMember | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrganization = async () => {
    if (!user) {
      setOrganization(null);
      setMembership(null);
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfile(profileData);

      // Fetch membership with organization
      const { data: memberData } = await supabase
        .from('organization_members')
        .select('*, organizations(*)')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (memberData) {
        setMembership(memberData);
        setOrganization(memberData.organizations as unknown as Organization);
      } else {
        setMembership(null);
        setOrganization(null);
      }
    } catch (error) {
      console.error('Error fetching organization:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, [user]);

  const hasRole = (roles: string[]) => {
    if (!membership) return false;
    return roles.includes(membership.role);
  };

  return (
    <OrganizationContext.Provider 
      value={{ 
        organization, 
        membership, 
        profile,
        loading, 
        refetch: fetchOrganization,
        hasRole 
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}
