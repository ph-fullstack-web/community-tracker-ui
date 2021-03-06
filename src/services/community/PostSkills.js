import axiosInstance from "../axios/index";

const postSkills = async (data) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "/api/peopleskills",
      data: data,
    });
    if (response.status >= 200 && response.status <= 299) {
      return response?.data;
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

export default postSkills;
