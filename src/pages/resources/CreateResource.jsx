
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import { useCreatePeople } from "hooks";
import { useParams, useNavigate } from "react-router-dom";
import { useNotificationContext } from "contexts/notification/NotificationContext";
import CustomContainer from "components/common/CustomContainer";


const CreateResource = () => {

  const { communityId } = useParams();
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreatePeople();
  const { dispatch: notificationDispatch } = useNotificationContext();

  const onCreateResource = (resourcePayload) => {
    resourcePayload.community = parseInt(communityId);
    mutate(resourcePayload, {
      onSuccess: (response) => {
        alert(response.message)
        navigate(`/resources/${communityId}`);
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Member has been created.'
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

      <ResourcesForm isProcessing={isLoading} onSubmitHandler={onCreateResource} />
    </PageContainer>
  );
};

export default CreateResource;
