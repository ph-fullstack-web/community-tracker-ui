import axiosInstance from '../index';

export const getMembers = async () => {
  try {
    const response = await axiosInstance.get('/api/people');
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
