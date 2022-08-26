import axiosInstance from "../axios/index";
import { GetAccessToken } from 'utils';

const deleteSkill = async (peopleSkillId) => {
  try {
    const token = GetAccessToken();
    const response = await axiosInstance.delete(
      `/api/peopleskills/${peopleSkillId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: `Bearer ${token}`
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
