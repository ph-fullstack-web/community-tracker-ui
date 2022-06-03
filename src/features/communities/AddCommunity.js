import Logo from "layout/Logo";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";
import AddCommunityService from "services/CommunityService/AddCommunityService";


const AddCommunity = () => {
    return (
      <PageContainer>
        <Logo />
        <PageTitle title="Community Input Page." />
        <CommunityForm onClickHandler={AddCommunityService} buttonText={"SAVE"}/>
      </PageContainer>
    );
  };

export default AddCommunity;
  