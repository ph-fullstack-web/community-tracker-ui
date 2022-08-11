
import axiosInstance from '../axios/index';
import { GetAccessToken } from 'utils';

const updateCommunityService = async ({id,data}) => {
    try{
        const token = GetAccessToken();
        const response = await axiosInstance({
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method:"PUT",
            url: `/api/community/${id}`,
            data: data
        })
        return response.status
    }
    catch(err){
        throw new Error(err.message)
    }

}

export default updateCommunityService