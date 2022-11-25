import axiosInstance from "./index";
import { authorizedHeaders, genericHeaders } from 'utils';
import { HTTP } from "utils/constants";

const update = async (url, payload, shouldBeAuthorized = true) => {
    try {
        const response = await axiosInstance({
          url,
          method: HTTP.PUT,
          headers: shouldBeAuthorized ? authorizedHeaders() : genericHeaders,
          data: payload
        });
        return response;
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error(error.message);
    }
}

export default update;