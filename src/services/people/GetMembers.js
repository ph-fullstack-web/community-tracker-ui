import read from "../axios/read";

const getMembers = async (id) => {
  const response = await read(`/api/community-members/${id}`);
  return response?.data?.data;
};

export default getMembers;
