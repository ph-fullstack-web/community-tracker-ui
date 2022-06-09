// import moment from 'moment';
import axiosInstance from "../index";

export const getMembers = async id => {
  try {
    const response = await axiosInstance.get(`/api/community-members/1`);
    if (response.status !== 200) {
      throw new Error(response.data);
    }

    console.log("response", response);
    return response.data.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
