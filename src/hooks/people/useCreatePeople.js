import { useMutation } from 'react-query';
import { createPeople } from 'services/people/CreatePeople';

const useCreatePeople = () => {
  const { mutate, isLoading, isError, data } = useMutation((payload) => createPeople(payload));

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useCreatePeople;