import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import MembersMainContainer from './mainContainer/MembersMainContainer';

const Members = () => {
  return (
    <PageContainer>
      <Logo />
      <PageTitle title="Resource Details Page." />

      <MembersMainContainer />
    </PageContainer>
  );
};

export default Members;
