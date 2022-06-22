import { useQuery } from 'react-query';
import { getSkills } from '../../services/community/GetSkills';
import { postSkills } from '../../services/community/PostSkills';

const useGetSkills = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
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

const usePostSkills = (inputData) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    'peopleskills',
    () => postSkills(inputData)
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export { useGetSkills, usePostSkills };
