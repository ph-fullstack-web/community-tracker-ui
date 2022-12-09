import read from '../axios/read';

const getPeopleById = async peopleId => {
  const response = await read(`/api/people/${peopleId}`);
  return response?.data?.data;
};

export default getPeopleById;
