import { useMutation } from "react-query";
import { postSkills } from "services";

const usePostSkills = () => {
  const { isLoading, isError, data, error, mutate } = useMutation(
    (payload) => postSkills(payload)
  );

  return {
    isLoading,
    isError,
    error,
    data,
    mutate,
  };
};

export default usePostSkills;
