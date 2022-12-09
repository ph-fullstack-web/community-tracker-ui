import update from '../axios/update';

const updateProject = async ({payload, projectId}) => {
  const response = await update(`/api/projects/${projectId}`, {
    project_name: payload.name,
    project_code: payload.code,
    is_active: payload.is_active,
  });
  return response?.data;
};

export default updateProject;
