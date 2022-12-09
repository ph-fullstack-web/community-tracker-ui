import {useMutation} from 'react-query';
import {createProject} from 'services';

const useCreateProject = () => {
  const {mutate, isLoading, isError, data} = useMutation(project =>
    createProject(project)
  );

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useCreateProject;
