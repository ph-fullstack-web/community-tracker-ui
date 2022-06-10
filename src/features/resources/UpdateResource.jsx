import { useParams } from "react-router-dom";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import useGetPeopleById from "hooks/people/useGetPeopleById";
import { useMemo } from "react";
import moment from "moment";

const UpdateResource = () => {

  const {peopleId} = useParams();
  const {isLoading, data: resourceData} = useGetPeopleById(peopleId)
  const onUpdateResource = (data) => {
    console.log('update resource', data)
  }

  const resourcePerson = useMemo(() => {
    if (resourceData) {
      const hiredDate = moment(resourceData.hired_date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      return {
        name: resourceData.full_name,
        state: resourceData.workstate_id,
        hiredDate: hiredDate,
        jobLevel: resourceData.joblevel_id,
        project: resourceData.project_id,
        email: resourceData.csv_email,
        cognizantId: resourceData.cognizantid_id,

        
        assignedTo: "",
        projectLead: "",
      }
    }
  }, [resourceData])

  return (
    <PageContainer>
        <PageTitle title="Resource Update Page" />

        {!isLoading && <ResourcesForm resourcePerson={resourcePerson} onSubmitHandler={onUpdateResource}/>}
        
    </PageContainer>
  );
};

export default UpdateResource;
