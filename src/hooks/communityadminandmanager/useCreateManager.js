import { useMutation } from 'react-query';
import { createManager } from 'services';

const useCreateManager = () => {
  const { mutate, isLoading, isError, data } = useMutation((payload) => createManager(payload));

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useCreateManager;