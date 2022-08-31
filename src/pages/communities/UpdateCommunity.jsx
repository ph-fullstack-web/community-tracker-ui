
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import { useNavigate, useParams } from 'react-router-dom';
import { useNotificationContext } from "contexts/notification/NotificationContext";
import { useGetCommunityById, useUpdateCommunity } from "hooks"
import { useMemo } from "react";

const UpdateCommunity = () => {
  const { id } = useParams();
  const { isLoading, data: communityData } = useGetCommunityById(id)
  const { dispatch: notificationDispatch } = useNotificationContext();
  const { mutate: updateCommunity } = useUpdateCommunity()
  const navigate = useNavigate();

  const onUpdateCommunity = async (data) => {
    const args = {
      id: parseInt(id),
      data: data.data
    }
    
    updateCommunity(args, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Community has been updated.'
          }
        });
        navigate(`/communities`)
      },
      onError: (error) => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'error',
            message: error.message
          }
        });
      }
    })
  };

  const community = useMemo(() => {
    if (communityData) {
      return {
        id: communityData.community_id,
        communityName: communityData.community_name,
        communityDescription: communityData.community_description,
        isActive: communityData.is_active,
        communityManagerId: communityData.community_manager,
        selectedFile: communityData.icon
      }
    }
  }, [communityData])
  return (
    <PageContainer>
      {!isLoading && <CommunityForm onClickHandler={onUpdateCommunity} community={community} buttonText={"UPDATE"} />}
    </PageContainer>
  );
};

export default UpdateCommunity;