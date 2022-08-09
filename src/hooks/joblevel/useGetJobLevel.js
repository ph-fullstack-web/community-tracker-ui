import { useQuery } from "react-query";
import { getJobLevel } from "services";

const useGetJobLevel = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "joblevel",
    () => getJobLevel()
  );
    console.log(data,'ano to job level')
  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetJobLevel;
