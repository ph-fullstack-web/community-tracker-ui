import create from "../axios/create";

const login = async (payload) => {
  const response = await create('/api/login', {
    cognizant_id: payload.cognizant_id,
    password: payload.password,
  }, false);
  return response?.data;
};

export default login;
