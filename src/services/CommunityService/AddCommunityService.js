import axiosInstance from '../index';

const AddCommunityService = async (data) => {
    try{
        const response = await axiosInstance({
            method:"POST",
            url: '/api/community/add',
            data: {
                data
            }
        })
        return response.status
    }
    catch(err){
        return 404
    }

}

export default AddCommunityService