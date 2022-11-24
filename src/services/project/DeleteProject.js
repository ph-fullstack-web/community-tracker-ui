import remove from "../axios/remove";

const deleteProject = async (projectId) => {
  const response = await remove(`/api/projects/${projectId}`);
  return response?.data;
};

export default deleteProject;
