import axiosInstance from "../axios";

const getPeopleById = async (peopleId) => {
  try {
    const response = await axiosInstance.get(`/api/people/${peopleId}`);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return await response.data.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export default getPeopleById;
