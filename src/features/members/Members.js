import { Box, Stack, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
        <Stack direction="row" alignItems="center">
          <Box>
            <SearchInput />
          </Box>
          <Box>
            <IconButton
              title="Go to Input Page"
              color="primary"
              size="medium"
              aria-label="Go to Input Page"
              style={{
                height: '5rem',
                width: '5rem',
              }}
              onClick={() => {}}>
              <AddCircleOutlineIcon
                fontSize="large"
                style={{
                  color: '#74808d',
                  fontWeight: '700',
                }}
              />
            </IconButton>
          </Box>
        </Stack>

        <MembersTable />
      </Box>
    </PageContainer>
  );
};

export default Members;
