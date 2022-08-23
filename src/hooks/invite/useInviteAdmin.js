import { useMutation } from 'react-query';
import { createAdmin } from 'services';

const useCreatePeople = () => {
  const { mutate, isLoading, isError, data } = useMutation((payload) => createAdmin(payload));

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useCreatePeople;