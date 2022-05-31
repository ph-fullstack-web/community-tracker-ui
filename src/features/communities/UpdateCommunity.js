import Logo from "layout/Logo";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";


const UpdateCommunity = () => {
    return (
      <PageContainer>
        <Logo />
        <PageTitle title="Community Update Page." />
        <CommunityForm />
      </PageContainer>
    );
  };
  
  export default UpdateCommunity;