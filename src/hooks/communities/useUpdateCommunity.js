import {useMutation} from 'react-query';
import {updateCommunityService} from 'services';

const useUpdateCommunity = () => {
  const {mutate, isLoading} = useMutation(args => updateCommunityService(args));

  return {
    isLoading,
    mutate,
  };
};

export default useUpdateCommunity;
