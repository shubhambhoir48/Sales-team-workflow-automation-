import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOrganization } from '@/contexts/OrganizationContext';

interface DashboardStats {
  totalPipeline: number;
  pipelineChange: number;
  activeDeals: number;
  dealsChange: number;
  teamMembers: number;
  winRate: number;
  winRateChange: number;
}

export function useDashboardStats() {
  const { organization } = useOrganization();
  const [stats, setStats] = useState<DashboardStats>({
    totalPipeline: 0,
    pipelineChange: 0,
    activeDeals: 0,
    dealsChange: 0,
    teamMembers: 0,
    winRate: 0,
    winRateChange: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organization) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        // Fetch active deals (not closed)
        const { data: deals } = await supabase
          .from('deals')
          .select('value, stage')
          .eq('organization_id', organization.id);

        const activeDeals = deals?.filter(d => 
          !['closed_won', 'closed_lost'].includes(d.stage)
        ) || [];
        
        const totalPipeline = activeDeals.reduce((sum, d) => sum + Number(d.value || 0), 0);
        
        // Calculate win rate
        const closedDeals = deals?.filter(d => 
          ['closed_won', 'closed_lost'].includes(d.stage)
        ) || [];
        const wonDeals = deals?.filter(d => d.stage === 'closed_won') || [];
        const winRate = closedDeals.length > 0 
          ? Math.round((wonDeals.length / closedDeals.length) * 100) 
          : 0;

        // Fetch team members
        const { count: memberCount } = await supabase
          .from('organization_members')
          .select('*', { count: 'exact', head: true })
          .eq('organization_id', organization.id)
          .eq('is_active', true);

        setStats({
          totalPipeline,
          pipelineChange: 12.5, // Would need historical data for real change
          activeDeals: activeDeals.length,
          dealsChange: 8.2,
          teamMembers: memberCount || 0,
          winRate,
          winRateChange: 5.1,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [organization]);

  return { stats, loading };
}
