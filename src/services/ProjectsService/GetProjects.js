import axiosInstance from "../axios/index";

export const getProjects = async () => {
  try {
    const response = await axiosInstance.get("MOCKS/projects.json");
    // if (response.status !== 200) {
    //   throw new Error(response.data);
    // }

    console.log("response", response);

    return response;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
