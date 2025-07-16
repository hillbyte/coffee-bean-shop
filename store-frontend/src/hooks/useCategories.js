import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../admin/helper/adminapicall';

// Hook for fetching all categories
export const useCategories = () => {
  return useQuery(
    'categories',
    getCategories,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      onError: (error) => {
        console.error('Error fetching categories:', error);
      },
    }
  );
};

// Hook for creating a category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation(createCategory, {
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries('categories');
    },
    onError: (error) => {
      console.error('Error creating category:', error);
    },
  });
};

// Hook for updating a category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation(updateCategory, {
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries('categories');
    },
    onError: (error) => {
      console.error('Error updating category:', error);
    },
  });
};

// Hook for deleting a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation(deleteCategory, {
    onSuccess: () => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries('categories');
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
    },
  });
};