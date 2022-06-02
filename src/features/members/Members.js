import { Box, Stack } from '@mui/material';

import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import PlusIconButton from 'components/PlusIconButton';
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
        <Stack direction="row" alignItems="center">
          <Box sx={{ width: '55ch', flex: '0 1 auto' }}>
            <SearchInput />
          </Box>
          <Box>
            <PlusIconButton
              title="Go to Input Page"
              ariaLabel="Go to Input Page"
              sxProp={{
                ml: { xs: 1, sm: 3 },
              }}
            />
          </Box>
        </Stack>

        <Box sx={{ overflowX: 'auto' }}>
          <MembersTable />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Members;
