import { useMutation } from '@tanstack/react-query';
import { createSuperhero } from '../services/createSuperhero';
import toast from 'react-hot-toast';

export const useCreateSuperhero = () => {
  return useMutation({
    mutationFn: async (data: FormData) => await createSuperhero(data),

    onMutate: async () => {
      // Show loading toast
      const toastId = toast.loading('Creating superhero...');
      return { toastId };
    },

    onSuccess: (_, __, context) => {
      // Dismiss loading toast
      toast.dismiss(context?.toastId);
      toast.success('Superhero created successfully!');
    },

    onError: (
      error: { response: { data: { message: string } } },
      __,
      context
    ) => {
      toast.dismiss(context?.toastId);
      toast.error(error.response.data.message || 'Failed to create superhero!');
    },
  });
};
