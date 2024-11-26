import { useState, useMemo } from 'react';
import repoData from '../data/repo-data.json';
import { RepoCard } from './RepoCard';
import { Pagination } from './Pagination';
import { SearchAndFilter } from './SearchAndFilter';
import { useRepositoryFiltering } from '../hooks/useRepositoryFiltering';
import type { Repository } from '../types';

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract unique categories from all repositories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    repoData.repositories.forEach((repo) => {
      repo.metadata.categories?.forEach((category) => categories.add(category));
    });
    return Array.from(categories).sort();
  }, []);

  // Filter repositories based on search term and categories
  const filteredRepos = useRepositoryFiltering(
    repoData.repositories,
    searchTerm,
    selectedCategories
  );

  const totalPages = Math.ceil(filteredRepos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRepos = filteredRepos.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Christian Open Source Projects Dashboard
          </h1>
          <div className="text-sm text-gray-600">
            Showing {filteredRepos.length ? startIndex + 1 : 0}-
            {Math.min(endIndex, filteredRepos.length)} of {filteredRepos.length} repositories
          </div>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          categories={allCategories}
        />

        {currentRepos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRepos.map((repo: Repository, index: number) => (
                <RepoCard key={`${repo.metadata.name}-${index}`} repo={repo} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No repositories found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
