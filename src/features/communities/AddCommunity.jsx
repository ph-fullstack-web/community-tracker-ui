import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import AddCommunityService from "../../services/community-service/AddCommunityService";


const AddCommunity = () => {
  return (
    <PageContainer>
      <PageTitle title="Community Input Page." />
      <CommunityForm onClickHandler={AddCommunityService} buttonText={"SAVE"} />
    </PageContainer>
  );
};

export default AddCommunity;
