import axiosInstance from './index';


export const getCommunities =  async () =>  {
    try {
        const response = await axiosInstance.get('/MOCKS/communities.json');
        return response.data;
    } catch (error) {
        return error.response.data
    }
}