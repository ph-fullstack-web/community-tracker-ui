import {useQuery} from 'react-query';
import {getPeopleByCSVEmail} from 'services';

const useGetPeopleByCSVEmail = csvEmail => {
  const {isLoading, isError, data, error, refetch} = useQuery(
    ['people-by-csvEmail', csvEmail],
    () => getPeopleByCSVEmail(csvEmail),
    {
      staleTime: 10000,
      refetchOnWindowFocus: false,
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

export default useGetPeopleByCSVEmail;
