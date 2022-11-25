import read from "../axios/read";

const getMemberWithSkills = async (data) => {
  const response = await read('/api/people/skills', data);
  return response?.data?.data;
};

export default getMemberWithSkills;
