import { useMutation } from "react-query";
import { updateSkill } from "services";

const useUpdateSkill = () => {
  const { mutate, isLoading } = useMutation((args) => updateSkill(args));

  return {
    isLoading,
    mutate,
  };
};

export default useUpdateSkill;
