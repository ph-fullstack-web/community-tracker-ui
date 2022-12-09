import {useQuery} from 'react-query';
import {getCommunityManagers} from 'services';

const useGetCommunityManagers = () => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    'community-managers',
    () => getCommunityManagers(),
    {
      staleTime: 10000,
    }
  );
  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetCommunityManagers;
