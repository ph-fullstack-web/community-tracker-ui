import moment from 'moment';
import axiosInstance from '../index';

export const getMembers = async id => {
  try {
    const response = await axiosInstance.get(`/api/community-members/${id}`);
    if (response.status !== 200) {
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
