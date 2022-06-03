import Logo from "layout/Logo";
import PageTitle from "layout/PageTitle";
import PageContainer from "layout/PageContainer";
import CommunityList from "components/community/CommunityList";

const Communities = () => {
  return (
    <PageContainer>
      <PageTitle title="Community selection page." />

      <CommunityList />
    </PageContainer>
  );
};

export default Communities;
