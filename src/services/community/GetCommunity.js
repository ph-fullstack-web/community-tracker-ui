import read from "../axios/read";

const getCommunities = async () => {
    const response = await read('/api/community/percentage');
    return response?.data;
};

export default getCommunities;
