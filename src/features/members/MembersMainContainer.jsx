import { Box, Stack } from '@mui/material';

import { SearchInput, PlusIconButton } from 'components';
import MembersTable from './MembersTable';

const MembersMainContainer = () => {
  return (
    <Box
      style={{
        marginTop: '3rem',
        marginBottom: '1rem',
      }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ width: { xs: '100%', md: '55ch' }, flex: '0 1 auto' }}>
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
      <MembersTable />
    </Box>
  );
};

export default MembersMainContainer;
