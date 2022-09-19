import axiosInstance from "../axios/index";
import { GetAccessToken } from 'utils';

const createProject = async (project) => {
  try {
    const token = GetAccessToken();
    const response = await axiosInstance.post(
      "/api/projects",
      {
        project: project.name,
        project_code: project.code,
        is_active: project.is_active,
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
export default createProject;
