import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";

const UpdateResource = () => {

  const onUpdateResource = (data) => {
    console.log('update resource', data)
  }

  return (
    <PageContainer>
        <PageTitle title="Resource Update Page" />

        <ResourcesForm onSubmitHandler={onUpdateResource}/>
    </PageContainer>
  );
};

export default UpdateResource;
