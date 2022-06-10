import axiosInstance from '../index';

const AddCommunityService = async ({data}) => {

    try{
        const response = await axiosInstance({
            method:"POST",
            url: '/api/community/add',
            data: data
        })
        return response.status
    }
    catch(err){
        throw new Error(err.message)
    }

}

export default AddCommunityService