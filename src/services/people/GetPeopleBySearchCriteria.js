import read from "../axios/read";

const getPeopleBySearchCriteria = async (searchCriteria) => {
  const response = await read('/api/people', {searchCriteria});
  return response?.data?.data;
};

export default getPeopleBySearchCriteria;
