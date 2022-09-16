import { useQuery } from "react-query";
import { getPeopleBySearchCriteria } from "services";

const useGetPeopleBySearchCriteria = (searchCriteria) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["people-by-search-criteria", searchCriteria],
    () => getPeopleBySearchCriteria(searchCriteria),
    {
      enabled: false,
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

export default useGetPeopleBySearchCriteria;
