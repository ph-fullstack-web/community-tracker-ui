import {useQuery} from 'react-query';
import {getWorkState} from 'services';

const useGetWorkState = () => {
  const {isLoading, isError, data, error, refetch} = useQuery('workstate', () =>
    getWorkState()
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetWorkState;
