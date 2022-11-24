import read from "../axios/read";

const getPeopleDetails = async () => {
  const response = await read('/api/peopledetails');
  return response?.data?.data;
};

export default getPeopleDetails;
