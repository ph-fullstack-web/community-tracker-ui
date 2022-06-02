import { Stack, Box } from '@mui/material';

import SearchInput from 'components/SearchInput';
import PlusIconButton from 'components/PlusIconButton';

const ActionSection = () => {
  return (
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
  );
};

export default ActionSection;
