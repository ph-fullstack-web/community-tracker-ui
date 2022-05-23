import axiosInstance from './index';


export const getCommunities =  async () =>  {
    try {
        const response = await axiosInstance.get('/todos');

        const MOCK_COMMUNITIES = [
            {
                name: "Community 1",
                color: "#2296f3"
            },
            {
                name: "Community 2",
                color: "#2296f3"
            },
            {
                name: "Community 3",
                color: "#2296f3"
            },
            {
                name: "Community 5",
                color: "#2296f3"
            },
            {
                name: "Community 6",
                color: "#2296f3"
            },
            {
                name: "Community 7",
                color: "#2296f3"
            },
            {
                name: "Community 8",
                color: "#2296f3"
            },
            {
                name: "Community 9",
                color: "#2296f3"
            },
            {
                name: "Community 10",
                color: "#2296f3"
            },
        ];
        return MOCK_COMMUNITIES;
    } catch (error) {
        return error.response.data
    }
}