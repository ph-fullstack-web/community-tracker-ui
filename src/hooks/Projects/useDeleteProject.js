import { useMutation } from "react-query";
import { deleteProject } from "services";

const useDeleteProject = () => {
  const { mutate, isLoading, isError } = useMutation(
    (projectId) => deleteProject(projectId)
  );

  return {
    isLoading,
    isError,
    mutate
  };
};

export default useDeleteProject;
