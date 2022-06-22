import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "layout/PageContainer";
import ResourcesForm from "components/resources/ResourcesForm";
import useGetPeopleById from "hooks/people/useGetPeopleById";
import useUpdatePeople from "hooks/people/useUpdatePeople";
import { useNotificationContext } from "contexts/notification/NotificationContext";
import { useMemo } from "react";
import moment from "moment";

const UpdateResource = () => {

  const { community, peopleId } = useParams();
  const { isLoading, data: resourceData } = useGetPeopleById(peopleId)
  const { mutate: updatePeople, isLoading: isUpdating } = useUpdatePeople()
  const { dispatch: notificationDispatch } = useNotificationContext();
  const navigate = useNavigate();


  const onUpdateResource = (data) => {
    const args = {
      peopleId: parseInt(peopleId),
      payload: data
    }
    updatePeople(args, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Member has been updated.'
          }
        });
        navigate(`/resources/${community}`)
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

  const resourcePerson = useMemo(() => {
    if (resourceData) {
      const hiredDate = moment(resourceData.hired_date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      return {
        id: resourceData.people_id,
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

      {!isLoading && <ResourcesForm isProcessing={isUpdating} resourcePerson={resourcePerson} onSubmitHandler={onUpdateResource} />}

    </PageContainer>
  );
};

export default UpdateResource;
