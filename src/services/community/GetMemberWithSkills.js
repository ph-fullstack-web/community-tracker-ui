import axiosInstance from "../axios/index";

const getMemberWithSkills = async (data) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "/api/people/skills",
      data: data,
    });
    if (response.status >= 200 && response.status <= 299) {
      return response?.data.data;
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

export default getMemberWithSkills;
