import create from "../axios/create";

const postSkills = async (data) => {
  const response = await create('/api/peopleskills', data)
  return response?.data;
};

export default postSkills;
