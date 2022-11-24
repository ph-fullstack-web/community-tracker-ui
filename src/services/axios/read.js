import axiosInstance from "./index";
import { authorizedHeaders, genericHeaders } from 'utils';
import { HTTP } from "utils/constants";

const read = async (url, params, shouldBeAuthorized = true) => {
    try {
        const response = await axiosInstance({
          url,
          method: HTTP.GET,
          headers: shouldBeAuthorized ? authorizedHeaders() : genericHeaders,
          params
        });
        return response;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export default read;