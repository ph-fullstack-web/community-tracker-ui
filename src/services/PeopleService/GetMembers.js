import axiosInstance from "../index";

export const getMembers = async id => {
  try {
    const response = await axiosInstance.get(`/api/community-members/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response.data.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
