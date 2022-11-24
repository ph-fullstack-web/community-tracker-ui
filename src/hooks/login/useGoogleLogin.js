import { useMutation } from 'react-query';
import { googleLogin } from 'services';

const useGoogleLogin = () => {
  const { mutate, isLoading, isError, data } = useMutation((payload) => googleLogin(payload));

  return {
    isLoading,
    mutate,
    data,
    isError,
  };
};

export default useGoogleLogin;