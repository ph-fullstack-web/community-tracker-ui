import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import useCreatePeople from "hooks/People/useCreatePeople";
import { useParams } from "react-router-dom";
const CreateResource = () => {

  const {community} = useParams();
  const {mutate, isLoading} = useCreatePeople()

  const onCreateResource = (resourcePayload) => {
    resourcePayload.community = parseInt(community);
    mutate(resourcePayload, {
      onSuccess: (response) => {
        alert(response.message)
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
