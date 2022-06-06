import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import MembersMainContainer from './MembersMainContainer';
import Navbar from 'layout/Navbar';

const Members = () => {
  return (
    <PageContainer>
      <Navbar />
      <PageTitle title="Resource Details Page." />

      <MembersMainContainer />
    </PageContainer>
  );
};

export default Members;
