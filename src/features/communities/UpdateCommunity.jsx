import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import UpdateCommunityService from "services/community-service/UpdateCommunityService";


const UpdateCommunity = () => {
    return (
      <PageContainer>
        <PageTitle title="Community Update Page." />
        <CommunityForm onClickHandler={UpdateCommunityService} buttonText={"UPDATE"}/>
      </PageContainer>
    );
  };
  
export default UpdateCommunity;