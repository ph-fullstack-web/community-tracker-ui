import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import useSwitchThemeContext from 'hooks/Theme/useSwitchThemeContext';

import { convertCamelCaseToTitleCase } from 'utils/Format/Case';
import { rowData } from './mockData';

const MembersTable = () => {
  const { currentThemePalette } = useSwitchThemeContext();
  const tableCellStyle = {
    border: `2px solid ${currentThemePalette.light}`,
    p: 1,
    color: currentThemePalette.text,
  };

  const tableHeaders = [
    'name',
    'assignedTo',
    'hiredDate',
    'state',
    'jobLevel',
    'project',
  ];

  const titleCasedTableHeaders = tableHeaders.map(string =>
    convertCamelCaseToTitleCase(string)
  );

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table
        sx={{ mt: 3, mb: 0.5, mx: { xs: 1, sm: 0 }, minWidth: 825 }}
        aria-label="members-table">
        <TableHead>
          <TableRow>
            {titleCasedTableHeaders.map(header => (
              <TableCell
                key={header}
                align="center"
                sx={{
                  ...tableCellStyle,
                  fontWeight: 'bold',
                  backgroundColor: currentThemePalette.bgSecondary,
                }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map(row => (
            <TableRow key={row.id}>
              {tableHeaders.map(header => (
                <TableCell
                  key={header}
                  align="center"
                  sx={{
                    ...tableCellStyle,
                    backgroundColor: currentThemePalette.bgPrimary,
                  }}>
                  {row[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MembersTable;
