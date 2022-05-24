import Logo from "components/Layout/Logo";
import PageTitle from "components/Layout/PageTitle";
import PageContainer from "components/Layout/PageContainer";
import CommunityList from "components/community/CommunityList";

const Communities = () => {
  return (
    <PageContainer>
      <Logo />
      <PageTitle title="Community selection page." />

      <CommunityList />
    </PageContainer>
  );
};

export default Communities;
