import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { convertCamelCaseToTitleCase } from 'utils/Format/Case';
import { rowData } from './mockData';

const MembersTable = () => {
  const tableCellStyle = { border: '2px solid #99deef', p: 1 };

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
        <TableHead sx={{ backgroundColor: '#e5e5e5' }}>
          <TableRow>
            {titleCasedTableHeaders.map(header => (
              <TableCell
                key={header}
                align="center"
                sx={{ ...tableCellStyle, fontWeight: 'bold' }}>
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
                  sx={{ ...tableCellStyle, backgroundColor: 'white' }}>
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
