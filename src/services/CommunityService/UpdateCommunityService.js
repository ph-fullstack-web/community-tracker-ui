import axiosInstance from '../index';

const UpdateCommunityService = async (id,data) => {
    try{
        const response = await axiosInstance({
            method:"POST",
            url: `/api/community/update/${id}`,
            data: {
                data
            }
        })
    console.log(response.status)
    return response.status
    }
    catch(err){
        return 404
    }

}

export default UpdateCommunityService