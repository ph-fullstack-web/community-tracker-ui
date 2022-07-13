import { useQuery } from "react-query";
import { getMemberWithSkills } from "services";

const useMemberWithSkill = (skills) => {
  const { isLoading, isError, data, error, refetch } = useQuery(
    "memberwithskills",
    () => getMemberWithSkills(skills)
  );

  return {
    isLoading,
    isError,
    error,
    data,
    refetch,
  };
};

export default useMemberWithSkill;
