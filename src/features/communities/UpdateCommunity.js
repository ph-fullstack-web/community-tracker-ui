import Logo from "layout/Logo";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import UpdateCommunityService from "services/CommunityService/UpdateCommunityService";


const UpdateCommunity = () => {
    return (
      <PageContainer>
        <Logo />
        <PageTitle title="Community Update Page." />
        <CommunityForm onClickHandler={UpdateCommunityService} buttonText={"UPDATE"}/>
      </PageContainer>
    );
  };
  
export default UpdateCommunity;