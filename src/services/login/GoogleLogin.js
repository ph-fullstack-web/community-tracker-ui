import axiosInstance from "../axios/index";

const googleLogin = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/googleLogin",
      {
        token: payload.token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
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
export default googleLogin;
