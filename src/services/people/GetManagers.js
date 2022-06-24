import axiosInstance from "../axios/index";

const getManagers = async () => {
  try {
    const response = await axiosInstance.get("/api/managers");
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data);
    }
    return await response.data.data;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export default getManagers;
