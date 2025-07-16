import { useQuery, useQueryClient } from 'react-query';
import { getProducts } from '../core/helper/coreapicalls';

// Hook for fetching all products
export const useProducts = () => {
  return useQuery(
    'products',
    getProducts,
    {
      // Cache for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep in cache for 10 minutes
      cacheTime: 10 * 60 * 1000,
      // Retry on failure
      retry: 2,
      // Transform error
      onError: (error) => {
        console.error('Error fetching products:', error);
      },
    }
  );
};

// Hook for prefetching products (can be used to preload data)
export const usePrefetchProducts = () => {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.prefetchQuery('products', getProducts, {
      staleTime: 5 * 60 * 1000,
    });
  };
};