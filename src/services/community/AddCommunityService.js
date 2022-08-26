import { GetAccessToken } from 'utils';
import axiosInstance from '../axios/index';

const addCommunityService = async ({data}) => {
    try{
    const token = GetAccessToken();
        const response = await axiosInstance({
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method:"POST",
            url: '/api/community',
            data: data
        })
        return response.status
    }
    catch(err){
        throw new Error(err.message)
    }

}

export default addCommunityService