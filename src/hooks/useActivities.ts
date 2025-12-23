import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';
import type { Tables } from '@/integrations/supabase/types';

type Activity = Tables<'activities'>;

export function useActivities() {
  const { organization } = useOrganization();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    if (!organization) return;

    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('organization_id', organization.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();

    if (organization) {
      const channel = supabase
        .channel('activities-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'activities',
            filter: `organization_id=eq.${organization.id}`,
          },
          () => {
            fetchActivities();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [organization]);

  const createActivity = async (activity: Omit<Partial<Activity>, 'organization_id'>) => {
    if (!organization) return { error: new Error('No organization') };

    const { data, error } = await supabase
      .from('activities')
      .insert({
        title: activity.title || 'New Activity',
        activity_type: activity.activity_type || 'note',
        organization_id: organization.id,
        ...activity,
      } as any)
      .select()
      .single();

    if (!error) fetchActivities();
    return { data, error };
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (!error) fetchActivities();
    return { data, error };
  };

  return { activities, loading, createActivity, updateActivity, refetch: fetchActivities };
}
