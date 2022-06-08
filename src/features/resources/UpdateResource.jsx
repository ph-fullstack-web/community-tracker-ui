import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";

const UpdateResource = () => {
  return (
    <PageContainer>
        <PageTitle title="Resource Update Page" />

        <ResourcesForm/>
    </PageContainer>
  );
};

export default UpdateResource;
