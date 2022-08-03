import axiosInstance from "../axios/index";

const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/projects/${projectId}`,
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
export default deleteProject;