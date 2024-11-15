import { useState } from 'react';
import {
  ExternalLink,
  Star,
  GitFork,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PlatformLogo } from './PlatformLogo';
import type { Repository, OwnerInfo, Metrics } from '../types';
import repoData from '../data/repo-data.json';

const OwnerCard = ({ owner }: { owner: OwnerInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 bg-gray-50 rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{owner.display_name}</div>
          <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">{owner.type}</span>
        </div>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-2 text-sm">
          {owner.bio && <p className="text-gray-600">{owner.bio}</p>}
          <div className="grid grid-cols-2 gap-4">
            {owner.location && (
              <div>
                <span className="font-medium">Location:</span> {owner.location}
              </div>
            )}
            {owner.company && (
              <div>
                <span className="font-medium">Company:</span> {owner.company}
              </div>
            )}
            {owner.public_repos !== undefined && (
              <div>
                <span className="font-medium">Public Repos:</span> {owner.public_repos}
              </div>
            )}
            {owner.followers !== undefined && (
              <div>
                <span className="font-medium">Followers:</span> {owner.followers}
              </div>
            )}
            {owner.members_count !== undefined && (
              <div>
                <span className="font-medium">Members:</span> {owner.members_count}
              </div>
            )}
          </div>
          {(owner.social_links.website || owner.social_links.twitter) && (
            <div className="flex gap-4 mt-2">
              {owner.social_links.website && (
                <a
                  href={owner.social_links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  Website
                </a>
              )}
              {owner.social_links.twitter && (
                <a
                  href={owner.social_links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <ExternalLink size={14} />
                  Twitter
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MetricsBar = ({ metrics }: { metrics: Metrics }) => {
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

const RepoCard = ({ repo }: { repo: Repository }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:hover:bg-transparent"
      >
        <ChevronRight size={20} />
      </button>

      <div className="ml-4 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(repoData.repositories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRepos = repoData.repositories.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Open Source Repository Dashboard</h1>
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, repoData.repositories.length)} of{' '}
            {repoData.repositories.length} repositories
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRepos.map((repo, index) => (
            <RepoCard key={`${repo.metadata.name}-${index}`} repo={repo} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
