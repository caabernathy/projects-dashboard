import { Star, GitFork, Users } from 'lucide-react';
import type { Metrics } from '../types';

export const MetricsBar = ({ metrics }: { metrics: Metrics }) => {
  return (
    <div className="flex gap-4 mt-4 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <Star size={16} className="text-yellow-500" />
        <span>{metrics.stars}</span>
      </div>
      <div className="flex items-center gap-1">
        <GitFork size={16} className="text-gray-500" />
        <span>{metrics.forks}</span>
      </div>
      <div className="flex items-center gap-1">
        <Users size={16} className="text-gray-500" />
        <span>{metrics.contributors.total_count}</span>
      </div>
    </div>
  );
};
