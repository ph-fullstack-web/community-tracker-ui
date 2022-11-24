import create from "../axios/create";

const googleLogin = async (payload) => {
  const response = await create('/api/googleLogin', {
    token: payload.token,
  }, false);
  return response?.data;
};

export default googleLogin;
