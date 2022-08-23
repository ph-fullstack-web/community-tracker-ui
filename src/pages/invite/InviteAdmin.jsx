import PageContainer from 'layout/PageContainer';
import AdminInviteForm from 'components/invite/AdminInviteForm';
import { useNotificationContext } from "contexts/notification/NotificationContext";
import { useInviteAdmin } from 'hooks'

const InviteAdmin = () => {

    const { dispatch: notificationDispatch } = useNotificationContext();
    const { mutate, isLoading } = useInviteAdmin();

    const onClickHandler = (details) => {
        console.log('API call here. data =>', details)

        const data = JSON.parse(details)

        mutate(data, {
            onSuccess: (response) => {
                console.log(response, 'successsss')
                notificationDispatch({
                    type: 'NOTIFY',
                    payload: {
                        type: 'success',
                        message: 'Admin has been created.'
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

        // //notify
        // notificationDispatch({
        //     type: 'NOTIFY',
        //     payload: {
        //         type: 'success',
        //         message: `Success!`
        //     }
        // });
    }

    return (
        <PageContainer>
            <AdminInviteForm onClickHandler={onClickHandler} />
        </PageContainer>
    );
};

export default InviteAdmin;
