import create from "../axios/create";

const createManager = async (payload) => {
  const response = await create('/api/admin', {
    cognizant_id: payload.cognizantId,
    email: payload.email,
    name: payload.name,
  });
  return response?.data;
};
export default createManager;
