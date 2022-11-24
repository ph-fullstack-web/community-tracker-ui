import read from "../axios/read";

const getPeopleByCSVEmail = async (csvEmail) => {
  const response = await read(`/api/people/email/${csvEmail}`, {}, false);
  return response?.data?.data;
};

export default getPeopleByCSVEmail;
