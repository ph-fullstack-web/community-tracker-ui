import { useQuery } from "react-query";
import { getCommunityById } from "services";

const useGetCommunityById = (id) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["communityById", id],
    () => getCommunityById(id)
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useGetCommunityById;
