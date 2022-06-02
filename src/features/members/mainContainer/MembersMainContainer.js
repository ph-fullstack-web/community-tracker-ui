import Box from '@mui/material/Box';

import ActionSection from './actionSection/ActionSection';
import MembersTable from './tableSection/MembersTable';

const MembersMainContainer = () => {
  return (
    <Box
      style={{
        marginTop: '3rem',
        marginBottom: '1rem',
      }}>
      <ActionSection />
      <MembersTable />
    </Box>
  );
};

export default MembersMainContainer;
