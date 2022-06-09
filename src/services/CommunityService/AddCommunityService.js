import axiosInstance from '../index';

const AddCommunityService = async ({data}) => {

    try{
        const response = await axiosInstance({
            headers:{
                'Content-Type': 'application/json'
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

export default AddCommunityService