import create from '../axios/create';

const createProject = async project => {
  const response = await create('/api/projects', {
    project: project.name,
    project_code: project.code,
    is_active: project.is_active,
  });
  return response?.data;
};

export default createProject;
