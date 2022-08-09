import axiosInstance from '../axios/index';

const getWorkState = async () => {
  try {
    const response = await axiosInstance.get("/api/people/workstate");
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

export default getWorkState;
