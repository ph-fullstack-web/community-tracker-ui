import create from "../axios/create";

const getMemberWithSkills = async (data) => {
  const response = await create('/api/people/skills', data);
  return response?.data?.data;
};

export default getMemberWithSkills;
