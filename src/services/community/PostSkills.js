import axiosInstance from "../axios/index";
import { GetAccessToken } from 'utils';

const postSkills = async (data) => {
  const token = GetAccessToken();
  try {
    const response = await axiosInstance({
      method: "POST",
      url: "/api/peopleskills",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      }
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
