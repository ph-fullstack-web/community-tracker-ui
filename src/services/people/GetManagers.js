import read from "../axios/read";

const getManagers = async () => {
  const response = await read('/api/managers');
  return response?.data?.data;
};

export default getManagers;
