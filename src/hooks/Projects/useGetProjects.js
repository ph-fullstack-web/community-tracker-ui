import {useQuery} from 'react-query';
import {getProjects} from 'services';

const useGetProjects = () => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    'projects',
    () => getProjects(),
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

export default useGetProjects;
