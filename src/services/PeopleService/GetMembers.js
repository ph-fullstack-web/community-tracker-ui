import moment from 'moment';
import axiosInstance from '../index';

export const getMembers = async () => {
  try {
    const response = await axiosInstance.get('/api/people');
    // In backend, need to update to send status code 200
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data);
    }

    const responseDataModified = response?.data?.data.map(member => {
      return {
        ...member,
        full_name: member.first_name + ' ' + member.last_name,
        hired_date_formatted: moment().format('MM/DD/YYYY'),
      };
    });

    return responseDataModified;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
