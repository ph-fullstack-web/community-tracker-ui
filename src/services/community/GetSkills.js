import read from '../axios/read';

const getSkills = async () => {
  const response = await read('/api/peopleskills');
  return response?.data?.data;
};

export default getSkills;
