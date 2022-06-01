import Box from '@mui/material/Box';

import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import MembersTable from './MembersTable';
import SearchInput from './searchInput/SearchInput';

const Members = () => {
  return (
    <PageContainer>
      <Logo />
      <PageTitle title="Resource Details Page." />

      <Box
        style={{
          marginTop: '3rem',
          marginBottom: '1rem',
        }}>
        <SearchInput />
        <MembersTable />
      </Box>
    </PageContainer>
  );
};

export default Members;
