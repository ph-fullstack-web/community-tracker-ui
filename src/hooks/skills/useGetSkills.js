import {useQuery} from 'react-query';
import {getSkills} from 'services';

const useGetSkills = () => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    'peopleskills',
    () => getSkills()
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetSkills;
