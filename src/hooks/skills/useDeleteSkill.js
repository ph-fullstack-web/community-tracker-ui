import {useMutation} from 'react-query';
import {deleteSkill} from 'services';

const useDeleteSkill = () => {
  const {mutate, isLoading, isError} = useMutation(peopleSkillId =>
    deleteSkill(peopleSkillId)
  );

  return {
    isLoading,
    isError,
    mutate,
  };
};

export default useDeleteSkill;
