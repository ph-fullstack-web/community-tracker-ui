import Logo from "layout/Logo";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityForm from "components/community/CommunityForm";


const AddCommunity = () => {
    return (
      <PageContainer>
        <Logo />
        <PageTitle title="Community Input Page." />
        <CommunityForm />
      </PageContainer>
    );
  };
  
  export default AddCommunity;
  