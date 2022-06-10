import { useMutation } from 'react-query';
import { updatePeople } from 'services/people-service/UpdatePeople';

const useUpdatePeople = () => {
  const { mutate, isLoading } = useMutation((args) => updatePeople(args));

  return {
    isLoading,
    mutate,
  };
};

export default useUpdatePeople;