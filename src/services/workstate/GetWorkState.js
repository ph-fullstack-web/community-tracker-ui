import read from '../axios/read';

const getWorkState = async () => {
  const response = await read('/api/people/workstate');
  return response?.data?.data;
};

export default getWorkState;
