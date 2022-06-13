import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import useCreatePeople from "hooks/people/useCreatePeople";
import { useParams, useNavigate } from "react-router-dom";
const CreateResource = () => {

  const {community} = useParams();
  const navigate = useNavigate();
  const {mutate, isLoading} = useCreatePeople()

  const onCreateResource = (resourcePayload) => {
    resourcePayload.community = parseInt(community);
    mutate(resourcePayload, {
      onSuccess: (response) => {
        alert(response.message)
        navigate(`/resources/${community}`)
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  return (
    <PageContainer>
        <PageTitle title="Resource Input Page" />

        <ResourcesForm isProcessing={isLoading} onSubmitHandler={onCreateResource}/>
    </PageContainer>
  );
};

export default CreateResource;
