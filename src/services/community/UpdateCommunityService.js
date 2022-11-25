
import update from '../axios/update';

const updateCommunityService = async ({id,data}) => {
    const response = await update(`/api/community/${id}`, {
      community_name: data.community_name,
      community_manager: parseInt(data.community_manager),
      community_description: data.community_description,
      icon: data.icon,
      is_active: data.is_active
    })
    return response?.data;
}

export default updateCommunityService