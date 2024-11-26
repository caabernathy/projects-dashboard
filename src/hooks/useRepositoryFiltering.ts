import { useMemo } from 'react';
import type { Repository } from '../types';

export const useRepositoryFiltering = (
  repositories: Repository[],
  searchTerm: string,
  selectedCategories: string[]
) => {
  return useMemo(() => {
    return repositories.filter((repo) => {
      const matchesSearch =
        searchTerm === '' ||
        repo.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.metadata.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.every((category) => repo.metadata.categories?.includes(category));

      return matchesSearch && matchesCategories;
    });
  }, [repositories, searchTerm, selectedCategories]);
};
