import axiosInstance from './index';
import {authorizedHeaders, genericHeaders} from 'utils';
import {HTTP} from 'utils/constants';

const create = async (url, payload, shouldBeAuthorized = true) => {
  try {
    const response = await axiosInstance({
      url,
      method: HTTP.POST,
      headers: shouldBeAuthorized ? authorizedHeaders() : genericHeaders,
      data: payload,
    });
    return response;
  } catch (error) {
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export default create;
