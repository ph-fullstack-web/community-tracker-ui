import read from '../axios/read';

const getProjects = async () => {
  const response = await read('/api/projects');
  return response?.data?.data;
};

export default getProjects;
