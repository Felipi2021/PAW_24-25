import { useQuery } from '@tanstack/react-query';
import { Post, User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

export const usePost = (postId: number) => {
  return useQuery<Post, Error>({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!postId,
  });
};

export const useUser = (userId: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: !!userId,
  });
};