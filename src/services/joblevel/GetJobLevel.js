import axiosInstance from '../axios/index';

const getJobLevel = async () => {
  try {
    const response = await axiosInstance.get("/api/community/job-level");
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

export default getJobLevel;
