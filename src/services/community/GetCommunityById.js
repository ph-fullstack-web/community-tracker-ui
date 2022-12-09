import read from '../axios/read';

const getCommunityById = async id => {
  const response = await read(`/api/community/${id}`);
  return response?.data?.data;
};
export default getCommunityById;
