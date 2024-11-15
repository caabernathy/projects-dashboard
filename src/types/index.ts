export interface OwnerInfo {
  type: string;
  name: string | null;
  display_name: string | null;
  url: string;
  avatar_url: string;
  bio?: string | null;
  location?: string | null;
  email?: string | null;
  website?: string | null;
  company?: string | null;
  description?: string | null;
  public_repos: number;
  followers?: number | null;
  following?: number | null;
  created_at: string;
  updated_at?: string | null;
  members_count?: number | null;
  repos_count?: number | null;
  social_links: {
    twitter: string | null;
    website: string | null;
  };
  hireable?: boolean | null;
  public_gists?: number | null;
  twitter?: string | null;
  recent_activity_count?: number | null;
}

export interface Metrics {
  stars: number;
  forks: number;
  open_issues: number;
  contributors: {
    total_count: number;
    top_contributors: string[];
  };
}

export interface Issue {
  id: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  author: string;
}

export interface Issues {
  summary: {
    total_count: number;
    open_count: number;
    closed_count: number;
  };
  labels: string[];
  features: {
    has_assignees: boolean;
    has_milestones: boolean;
  };
  engagement: {
    issues_with_comments: number;
    average_comments: number;
  };
  recent_activity: Issue[];
}

export interface Contributions {
  commit_activity: {
    total_commits_last_year: number;
  };
  repository_activity: {
    last_updated: string | null;
    recent_releases: any[];
  };
}

export interface Repository {
  platform: string;
  metadata: {
    name: string;
    owner: string;
    description: string | null;
    url: string;
    created_at: string;
    last_updated: string;
    default_branch: string;
    is_archived: boolean;
    is_fork: boolean;
    primary_language: string | null;
    license: string;
  };
  metrics: Metrics;
  owner_info: OwnerInfo;
  issues: Issues;
  contributions: Contributions;
  original_name: string;
  original_description: string;
  original_url: string;
}

export interface RepoData {
  timestamp: string;
  total_repositories: number;
  successful_analyses: number;
  failed_analyses: number;
  repositories: Repository[];
}
