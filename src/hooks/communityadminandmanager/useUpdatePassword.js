import { useMutation } from "react-query";
import { updatePassword } from "services";

const useUpdatePassword = () => {
  const { mutate, isLoading } = useMutation((args) => updatePassword(args));

  return {
    isLoading,
    mutate,
  };
};

export default useUpdatePassword;
