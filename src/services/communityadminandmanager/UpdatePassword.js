import { GetAccessToken } from "utils";
import axiosInstance from "../axios/index";

const updatePassword = async ({ payload, communityAdminAndManagerId }) => {
  try {
    const token = GetAccessToken();
    const response = await axiosInstance.put(
      `/api/admin/${communityAdminAndManagerId}/password`,
      {
        password: payload.password,
        newpassword: payload.newPassword,
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
export default updatePassword;
