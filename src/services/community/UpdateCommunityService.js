
import axiosInstance from '../axios/index';
import { GetAccessToken } from 'utils';

const updateCommunityService = async ({id,data}) => {
  try{
    const token = GetAccessToken();
    const response = await axiosInstance.put(
      `/api/community/${id}`,
      {
        community_name: data.community_name,
        community_manager: parseInt(data.community_manager),
        community_description: data.community_description,
        icon: data.icon,
        is_active: data.is_active
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data);
    }
    return await response.data;
  }
  catch(error){
    if (error?.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
}

export default updateCommunityService