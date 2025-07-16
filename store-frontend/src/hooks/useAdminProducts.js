import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProduct 
} from '../admin/helper/adminapicall';

// Hook for fetching all products (admin view)
export const useAdminProducts = () => {
  return useQuery(
    'admin-products',
    getAllProducts,
    {
      staleTime: 3 * 60 * 1000, // 3 minutes (shorter for admin)
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      onError: (error) => {
        console.error('Error fetching admin products:', error);
      },
    }
  );
};

// Hook for fetching a single product
export const useProduct = (productId) => {
  return useQuery(
    ['product', productId],
    () => getProduct(productId),
    {
      enabled: !!productId, // Only run if productId exists
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 2,
      onError: (error) => {
        console.error('Error fetching product:', error);
      },
    }
  );
};

// Hook for creating a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation(createProduct, {
    onSuccess: () => {
      // Invalidate both admin and public product queries
      queryClient.invalidateQueries('admin-products');
      queryClient.invalidateQueries('products');
    },
    onError: (error) => {
      console.error('Error creating product:', error);
    },
  });
};

// Hook for updating a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation(updateProduct, {
    onSuccess: (data, variables) => {
      // Invalidate both admin and public product queries
      queryClient.invalidateQueries('admin-products');
      queryClient.invalidateQueries('products');
      // Also invalidate the specific product query
      queryClient.invalidateQueries(['product', variables.productId]);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
    },
  });
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation(deleteProduct, {
    onSuccess: () => {
      // Invalidate both admin and public product queries
      queryClient.invalidateQueries('admin-products');
      queryClient.invalidateQueries('products');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
    },
  });
};