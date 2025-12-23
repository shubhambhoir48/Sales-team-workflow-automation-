import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';
import type { Tables } from '@/integrations/supabase/types';

type Contact = Tables<'contacts'>;

export function useContacts() {
  const { organization } = useOrganization();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    if (!organization) return;

    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [organization]);

  const createContact = async (contact: Omit<Partial<Contact>, 'organization_id'>) => {
    if (!organization) return { error: new Error('No organization') };

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        company_name: contact.company_name || 'New Contact',
        organization_id: organization.id,
        ...contact,
      } as any)
      .select()
      .single();

    if (!error) fetchContacts();
    return { data, error };
  };

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error) fetchContacts();
    return { data, error };
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (!error) fetchContacts();
    return { error };
  };

  return { contacts, loading, createContact, updateContact, deleteContact, refetch: fetchContacts };
}
