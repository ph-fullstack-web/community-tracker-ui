import PageContainer from 'layout/PageContainer';
import ManagerInviteForm from 'components/invite/ManagerInviteForm';
import { useNotificationContext } from "contexts/notification/NotificationContext";
import { useCreateManager } from 'hooks';
import { useNavigate } from "react-router-dom";

const InviteManager = () => {

  const { dispatch: notificationDispatch } = useNotificationContext();
  const { mutate, isLoading } = useCreateManager();
  const navigate = useNavigate();

  const onCreateManager = (details) => {
    mutate(details, {
      onSuccess: (response) => {
        navigate(`/`);
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Manager has been added.'
          }
        });
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
  }

  return (
    <PageContainer>
      <ManagerInviteForm isProcessing={isLoading} onClickHandler={onCreateManager} />
    </PageContainer>
  );
};

export default InviteManager;
