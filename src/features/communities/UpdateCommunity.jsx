import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import { updateCommunityService } from "services";


const UpdateCommunity = () => {
    return (
      <PageContainer>
        <PageTitle title="Community Update Page." />
        <CommunityForm onClickHandler={updateCommunityService} buttonText={"UPDATE"}/>
      </PageContainer>
    );
  };
  
export default UpdateCommunity;