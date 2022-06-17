import axiosInstance from '../index';

export const getSkills = async () => {
  try {
    const response = await axiosInstance.get('/api/peopleskills');
    if (response.status >= 200 && response.status <= 299) {
      //check valid http response
      return response?.data?.data;
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
