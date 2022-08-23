import axiosInstance from "../axios/index";

const createAdmin = async (payload) => {
  try {
    console.log(payload.cognizantId,'<-payload')
    const response = await axiosInstance.post(
      "/api/admin",
      {
        name: `${payload.firstName} ${payload.lastName}`,
        cognizant_id: payload.cognizantId,
        email: payload.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
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
export default createAdmin;
