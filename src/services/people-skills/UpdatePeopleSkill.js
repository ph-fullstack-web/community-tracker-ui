import update from '../axios/update';

const updateSkill = async ({payload, peopleSkillId}) => {
  const response = await update(`/api/peopleskills/${peopleSkillId}`, {
    description: payload.peopleskills_desc,
    is_active: payload.is_active,
  });
  return response?.data;
};

export default updateSkill;
