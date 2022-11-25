import create from "../axios/create";

const addCommunityService = async ({data}) => {
    const response = await create('/api/community', data)
    return response?.status
}

export default addCommunityService