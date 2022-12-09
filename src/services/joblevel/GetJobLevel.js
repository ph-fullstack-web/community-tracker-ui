import read from '../axios/read';
const getJobLevel = async () => {
  const response = await read('/api/community/job-level');
  return response?.data?.data;
};

export default getJobLevel;
