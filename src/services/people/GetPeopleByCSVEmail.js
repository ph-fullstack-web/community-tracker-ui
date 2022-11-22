import axiosInstance from "../axios";

const getPeopleByCSVEmail = async (csvEmail) => {
  try {
    if(csvEmail) {
      const response = await axiosInstance.get(`/api/people/email/${csvEmail}`);
      if (response.status !== 200) {
        throw new Error(response.data);
      }
      return await response.data.data;
    }    
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export default getPeopleByCSVEmail;
