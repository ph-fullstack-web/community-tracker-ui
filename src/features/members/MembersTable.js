import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
    <Table
      sx={{ minWidth: 650 }}
      aria-label="members-table"
      style={{
        marginTop: '3rem',
        marginBottom: '1rem',
      }}>
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
              <TableCell align="center" sx={tableCellStyle}>
                {row[header]}
              </TableCell>
            ))}
          </TableRow>
        ))}
        {/* {rowData.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row" sx={tableCellStyle}>
              {row.name}
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              {row.assignedTo}
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              {row.hiredDate}
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              {row.state}
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              {row.jobLevel}
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              {row.project}
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default MembersTable;
