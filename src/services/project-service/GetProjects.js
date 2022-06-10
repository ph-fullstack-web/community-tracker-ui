//import axiosInstance from '../index';

export const getProjects = async () =>  {
    try {
        const response = await fetch('/MOCKS/projects.json');// axiosInstance.get('/api/community');
    
        return await response.json()
    } catch (error) {
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message)
        }
        throw new Error(error.message)
    }
    
}
