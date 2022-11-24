import remove from "../axios/remove";

const deleteSkill = async (peopleSkillId) => {
  const response = await remove(`/api/peopleskills/${peopleSkillId}`);
  return response?.data;
};

export default deleteSkill;
