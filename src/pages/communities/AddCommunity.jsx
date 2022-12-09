import PageContainer from 'layout/PageContainer';
import CommunityForm from 'components/community/CommunityForm';
import {addCommunityService} from 'services';
import {useNavigate} from 'react-router-dom';
import {useNotificationContext} from 'contexts/notification/NotificationContext';

const AddCommunity = () => {
  const {dispatch: notificationDispatch} = useNotificationContext();
  const navigator = useNavigate();
  const onSaveCommunity = async data => {
    await addCommunityService(data);
    notificationDispatch({
      type: 'NOTIFY',
      payload: {
        type: 'success',
        message: 'Community has been created.',
      },
    });
    navigator('/communities');
  };
  return (
    <PageContainer>
      <CommunityForm onClickHandler={onSaveCommunity} buttonText={'SAVE'} />
    </PageContainer>
  );
};

export default AddCommunity;
