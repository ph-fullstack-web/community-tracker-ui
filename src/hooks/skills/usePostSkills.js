import { useQuery } from "react-query";
import { postSkills } from "services";

const usePostSkills = (inputData) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "peopleskills",
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

export default usePostSkills;
