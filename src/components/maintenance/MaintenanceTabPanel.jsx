import React from 'react';
import {Box, Typography} from '@mui/material';

export const MaintenanceTabPanel = ({children, index, value}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={index}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
};
