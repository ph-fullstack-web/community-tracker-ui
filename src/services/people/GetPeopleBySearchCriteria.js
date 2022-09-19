import axiosInstance from "../axios/index";

const getPeopleBySearchCriteria = async (searchCriteria) => {
  try {
    const response = await axiosInstance.get('/api/people', {params: {searchCriteria}});
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
export default getPeopleBySearchCriteria;
