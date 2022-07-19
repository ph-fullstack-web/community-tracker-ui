import axiosInstance from "../axios/index";

const deleteSkill = async (peopleSkillId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/peopleskills/${peopleSkillId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data);
    }
    return await response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export default deleteSkill;
