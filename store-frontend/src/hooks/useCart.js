import { useQuery, useMutation, useQueryClient } from 'react-query';
import { loadCart, addItemToCart, removeItemFromCart } from '../core/helper/CartHelper';

// Hook for cart data
export const useCart = () => {
  return useQuery(
    'cart',
    loadCart,
    {
      staleTime: 0, // Always fresh for cart
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true, // Refetch when window gains focus
      onError: (error) => {
        console.error('Error loading cart:', error);
      },
    }
  );
};

// Hook for adding item to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ product, callback }) => {
      return new Promise((resolve, reject) => {
        addItemToCart(product, () => {
          if (callback) callback();
          resolve();
        });
      });
    },
    {
      onSuccess: () => {
        // Invalidate cart query to refresh cart data
        queryClient.invalidateQueries('cart');
      },
      onError: (error) => {
        console.error('Error adding to cart:', error);
      },
    }
  );
};

// Hook for removing item from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (productId) => {
      removeItemFromCart(productId);
      return Promise.resolve();
    },
    {
      onSuccess: () => {
        // Invalidate cart query to refresh cart data
        queryClient.invalidateQueries('cart');
      },
      onError: (error) => {
        console.error('Error removing from cart:', error);
      },
    }
  );
};

// Hook for cart item count
export const useCartItemCount = () => {
  const { data: cart = [] } = useCart();
  return cart.length;
};