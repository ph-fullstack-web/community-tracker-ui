import axiosInstance from "../axios/index";

const getPeopleDetailsDesc = async () => {
  try {
    const response = await axiosInstance.get("/api/peopledetails/description");
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

export default getPeopleDetailsDesc;
