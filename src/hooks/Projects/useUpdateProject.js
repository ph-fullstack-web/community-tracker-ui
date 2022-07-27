import { useMutation } from "react-query";
import { updateProject } from "services";

const useUpdateProject = () => {
  const { mutate, isLoading } = useMutation((args) => updateProject(args));

  return {
    isLoading,
    mutate,
  };
};

export default useUpdateProject;
