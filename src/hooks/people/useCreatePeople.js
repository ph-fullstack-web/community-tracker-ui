import {useMutation} from 'react-query';
import {createPeople} from 'services';

const useCreatePeople = () => {
  const {mutate, isLoading, isError, data} = useMutation(payload =>
    createPeople(payload)
  );

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useCreatePeople;
