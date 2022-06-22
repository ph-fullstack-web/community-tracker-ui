import { useQuery } from "react-query";
import { getSkills, postSkills } from "services";

const useGetSkills = () => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "peopleskills",
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

export { useGetSkills, usePostSkills };
