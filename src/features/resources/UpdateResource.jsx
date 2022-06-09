import { useParams } from "react-router-dom";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import useGetPeopleById from "hooks/People/useGetPeopleById";


const UpdateResource = () => {

  const {peopleId} = useParams();
  const {isLoading, data: resourceData} = useGetPeopleById(peopleId)
  const onUpdateResource = (data) => {
    console.log('update resource', data)
  }

  return (
    <PageContainer>
        <PageTitle title="Resource Update Page" />

        {!isLoading && <ResourcesForm resourcePerson={resourceData} onSubmitHandler={onUpdateResource}/>}
        
    </PageContainer>
  );
};

export default UpdateResource;
