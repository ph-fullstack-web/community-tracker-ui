import read from "../axios/read";

const getCommunityManagers = async () => {
  const response = await read('/api/managers/community');
  return response?.data?.data;
};

export default getCommunityManagers;
