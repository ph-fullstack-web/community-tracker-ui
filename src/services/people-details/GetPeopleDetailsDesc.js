import read from "../axios/read";

const getPeopleDetailsDesc = async () => {
  const response = await read('/api/peopledetails/description');
  return response?.data?.data;
};

export default getPeopleDetailsDesc;
