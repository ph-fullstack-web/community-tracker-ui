import axiosInstance from '../index';

export const getManagers = async () =>  {
    try {
        const response = await axiosInstance.get('/api/managers');
        if (response.status !== 200 || response.status !== 201) {
            throw new Error(response.data)
        }
        console.log(response)
        return await response.data
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
    
}