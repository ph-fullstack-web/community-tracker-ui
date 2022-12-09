import update from '../axios/update';

const updatePassword = async ({payload, communityAdminAndManagerId}) => {
  const response = await update(
    `/api/admin/${communityAdminAndManagerId}/password`,
    {
      password: payload.password,
      newpassword: payload.newPassword,
    }
  );
  return response?.data;
};

export default updatePassword;
