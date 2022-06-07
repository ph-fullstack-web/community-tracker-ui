import axiosInstance from '../index';

const UpdateCommunityService = async ({id,data}) => {
    try{
        const response = await axiosInstance({
            method:"POST",
            url: `/api/community/update/${id}`,
            data: data
        })
    return response.status
    }
    catch(err){
        throw new Error(err.message)
    }

}

export default UpdateCommunityService