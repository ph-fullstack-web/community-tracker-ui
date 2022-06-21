
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import useCreatePeople from "hooks/people/useCreatePeople";
import { useParams, useNavigate } from "react-router-dom";
import { useNotificationContext } from "contexts/notification/NotificationContext";


const CreateResource = () => {

  const { community } = useParams();
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreatePeople();
  const { dispatch: notificationDispatch } = useNotificationContext();

  const onCreateResource = (resourcePayload) => {
    resourcePayload.community = parseInt(community);
    mutate(resourcePayload, {
      onSuccess: (response) => {
        alert(response.message)
        navigate(`/resources/${community}`);
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
