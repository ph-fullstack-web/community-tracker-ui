import { useMutation } from 'react-query';
import { login } from 'services';

const useLogin = () => {
  const { mutate, isLoading, isError, data } = useMutation((payload) => login(payload));

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useLogin;