import axiosInstance from "../axios/index";
import { GetAccessToken } from 'utils';

const updateProject = async ({ payload, projectId }) => {
  try {
    const token = GetAccessToken();
    const response = await axiosInstance.put(
      `/api/projects/${projectId}`,
      {
        project_name: payload.name,
        project_code: payload.code,
        is_active: payload.is_active,
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
export default updateProject;
