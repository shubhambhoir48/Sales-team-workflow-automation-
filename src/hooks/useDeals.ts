import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';
import type { Tables } from '@/integrations/supabase/types';

type Deal = Tables<'deals'>;

export function useDeals() {
  const { organization } = useOrganization();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    if (!organization) return;

    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();

    if (organization) {
      const channel = supabase
        .channel('deals-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'deals',
            filter: `organization_id=eq.${organization.id}`,
          },
          () => {
            fetchDeals();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [organization]);

  const createDeal = async (deal: Omit<Partial<Deal>, 'organization_id'>) => {
    if (!organization) return { error: new Error('No organization') };

    const { data, error } = await supabase
      .from('deals')
      .insert({
        title: deal.title || 'New Deal',
        organization_id: organization.id,
        ...deal,
      } as any)
      .select()
      .single();

    if (!error) fetchDeals();
    return { data, error };
  };

  const updateDeal = async (id: string, updates: Partial<Deal>) => {
    const { data, error } = await supabase
      .from('deals')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error) fetchDeals();
    return { data, error };
  };

  const deleteDeal = async (id: string) => {
    const { error } = await supabase
      .from('deals')
      .delete()
      .eq('id', id);

    if (!error) fetchDeals();
    return { error };
  };

  return { deals, loading, createDeal, updateDeal, deleteDeal, refetch: fetchDeals };
}
