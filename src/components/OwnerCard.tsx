import { useState } from 'react';
import { ExternalLink, ChevronUp, ChevronDown, Copy, Check } from 'lucide-react';
import type { OwnerInfo } from '../types';

interface OwnerCardProps {
  owner: OwnerInfo;
}

export const OwnerCard = ({ owner }: OwnerCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    if (owner.email) {
      await navigator.clipboard.writeText(owner.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

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
          {(owner.social_links.website || owner.social_links.twitter || owner.email) && (
            <div className="flex gap-4 mt-2">
              {owner.email && (
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${owner.email}`}
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ExternalLink size={14} />
                    Email
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    title={copied ? 'Copied!' : `Copy email: ${owner.email}`}
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              )}
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
