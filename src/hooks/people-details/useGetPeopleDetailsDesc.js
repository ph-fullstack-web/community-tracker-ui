import {useQuery} from 'react-query';
import {getPeopleDetailsDesc} from 'services';

const useGetPeopleDetailsDesc = () => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    'peopledetailsdesc',
    () => getPeopleDetailsDesc()
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetPeopleDetailsDesc;
