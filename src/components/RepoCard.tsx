import { Clock, ExternalLink } from 'lucide-react';
import { PlatformLogo } from './PlatformLogo';
import { MetricsBar } from './MetricsBar';
import { OwnerCard } from './OwnerCard';
import { formatDate } from '../utils/dateFormatters';
import type { Repository } from '../types';

const getPlatformColor = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return 'text-gray-900';
    case 'gitlab':
      return 'text-orange-600';
    default:
      return 'text-gray-600';
  }
};

export const RepoCard = ({ repo }: { repo: Repository }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <a
            href={repo.metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            {repo.metadata.name}
            <ExternalLink size={16} />
          </a>
          <p className="text-sm text-gray-600 mt-2">{repo.metadata.description}</p>
          {repo.metadata.categories && (
            <div className="flex flex-wrap gap-2 mt-2">
              {repo.metadata.categories.map((category) => (
                <span
                  key={category}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        <span
          className={`flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full ${getPlatformColor(repo.platform)}`}
        >
          <PlatformLogo platform={repo.platform} className="w-4 h-4" />
          {repo.platform}
        </span>
      </div>

      <MetricsBar metrics={repo.metrics} />

      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
        <Clock size={16} />
        <span>Updated {formatDate(repo.metadata.last_updated)}</span>
      </div>

      <OwnerCard owner={repo.owner_info} />
    </div>
  );
};
