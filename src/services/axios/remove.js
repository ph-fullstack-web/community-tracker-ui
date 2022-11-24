import axiosInstance from "./index";
import { authorizedHeaders, genericHeaders } from 'utils';
import { HTTP } from "utils/constants";

const remove = async (url, shouldBeAuthorized = true) => {
    try {
        const response = await axiosInstance({
          url,
          method: HTTP.DELETE,
          headers: shouldBeAuthorized ? authorizedHeaders() : genericHeaders,
        });
        return response;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export default remove;