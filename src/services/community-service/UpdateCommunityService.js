
import axiosInstance from '../index';

const UpdateCommunityService = async ({id,data}) => {
    try{
        const response = await axiosInstance({
            headers:{
                'Content-Type': 'application/json'
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

export default UpdateCommunityService