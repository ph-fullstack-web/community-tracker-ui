import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import MembersTable from './MembersTable';

const Members = () => {
  return (
    <PageContainer>
      <Logo />
      <PageTitle title="Resource Details Page." />

      <MembersTable />
    </PageContainer>
  );
};

export default Members;
