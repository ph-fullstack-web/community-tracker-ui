
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import { updateCommunityService } from "services";
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from "contexts/notification/NotificationContext";


const UpdateCommunity = () => {
  const { dispatch: notificationDispatch } = useNotificationContext();
  const navigator = useNavigate();
  const onUpdateCommunity = async (data) => {
    await updateCommunityService(data);
    notificationDispatch({
      type: 'NOTIFY',
      payload: {
        type: 'success',
        message: 'Community has been updated.'
      }
    });
    navigator('/communities');
  };
  return (
    <PageContainer>
      <CommunityForm onClickHandler={onUpdateCommunity} buttonText={"UPDATE"} />
    </PageContainer>
  );
};

export default UpdateCommunity;