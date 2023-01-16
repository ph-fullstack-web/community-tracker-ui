import create from '../axios/create';

const createPeople = async payload => {
  const response = await create('/api/people', {
    cognizantid_id: parseInt(payload.cognizantId),
    full_name: payload.name,
    csv_email: payload.email,
    hired_date: payload.hiredDate,
    community_id: payload.community,
    workstate_id: parseInt(payload.state),
    joblevel_id: payload.jobLevel ? parseInt(payload.jobLevel) : 10,
    project_id: payload.project ? parseInt(payload.project) : null,
    last_name: '',
    first_name: '',
    middle_name: '',
    is_active: true,
    is_probationary: payload.isProbationary,
    skills: payload.skills,
    details: payload.details,
  });
  return response?.data;
};

export default createPeople;
