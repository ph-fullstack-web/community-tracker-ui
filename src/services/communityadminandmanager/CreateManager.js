import axiosInstance from "../axios/index";
import { GetAccessToken } from 'utils';

const createManager = async (payload) => {
  try {
    const token = GetAccessToken();
    const response = await axiosInstance.post(
      "/api/admin",
      {
        cognizant_id: payload.cognizantId,
        email: payload.email,
        name: payload.name,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data);
    }
    return await response.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
export default createManager;
