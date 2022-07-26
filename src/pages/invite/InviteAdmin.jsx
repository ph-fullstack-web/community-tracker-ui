import PageContainer from 'layout/PageContainer';
import AdminInviteForm from 'components/invite/AdminInviteForm';
import { useNotificationContext } from "contexts/notification/NotificationContext";

const InviteAdmin = () => {

    const { dispatch: notificationDispatch } = useNotificationContext();

    const onClickHandler = (details) => {
        console.log('API call here. data =>' , details)

        //notify
        notificationDispatch({
            type: 'NOTIFY',
            payload: {
                type: 'success',
                message: `Success!`
            }
        });
    }

    return (
        <PageContainer>
            <AdminInviteForm onClickHandler={onClickHandler} />
        </PageContainer>
    );
};

export default InviteAdmin;
