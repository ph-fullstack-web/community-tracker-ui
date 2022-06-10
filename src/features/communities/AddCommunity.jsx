import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import { addCommunityService } from "services";


const AddCommunity = () => {
  return (
    <PageContainer>
      <PageTitle title="Community Input Page." />
      <CommunityForm onClickHandler={addCommunityService} buttonText={"SAVE"} />
    </PageContainer>
  );
};

export default AddCommunity;
