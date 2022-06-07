import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";

const CreateResource = () => {
  return (
    <PageContainer>
        <PageTitle title="Resource Input Page" />

        <ResourcesForm/>
    </PageContainer>
  );
};

export default CreateResource;
