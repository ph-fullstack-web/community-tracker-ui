import {useQuery} from 'react-query';
import {getPeopleDetails} from 'services';

const useGetPeopleDetails = () => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    'peopledetails',
    () => getPeopleDetails()
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetPeopleDetails;
