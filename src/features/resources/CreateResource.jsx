import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";

const CreateResource = () => {

  const onCreateResource = (data) => {
    console.log('create resource', data)
  }
  return (
    <PageContainer>
        <PageTitle title="Resource Input Page" />

        <ResourcesForm onSubmitHandler={onCreateResource}/>
    </PageContainer>
  );
};

export default CreateResource;
