import { useMutation, useQueryClient } from 'react-query';
import { signin, signup, signout } from '../auth/helper';

// Hook for user signin
export const useSignin = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ email, password }) => signin({ email, password }),
    {
      onSuccess: (data) => {
        // Clear any existing user data and refetch
        queryClient.invalidateQueries('user');
        queryClient.invalidateQueries('cart');
      },
      onError: (error) => {
        console.error('Signin error:', error);
      },
    }
  );
};

// Hook for user signup
export const useSignup = () => {
  return useMutation(
    ({ name, email, password }) => signup({ name, email, password }),
    {
      onError: (error) => {
        console.error('Signup error:', error);
      },
    }
  );
};

// Hook for user signout
export const useSignout = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    () => {
      return new Promise((resolve) => {
        signout(() => {
          resolve();
        });
      });
    },
    {
      onSuccess: () => {
        // Clear all cached data on signout
        queryClient.clear();
      },
      onError: (error) => {
        console.error('Signout error:', error);
      },
    }
  );
};