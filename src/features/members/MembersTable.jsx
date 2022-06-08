import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import useSwitchThemeContext from 'hooks/Theme/useSwitchThemeContext';
import { convertCamelCaseToTitleCase } from 'utils/Format/Case';
import useGetMembers from 'hooks/People/useGetMembers';

const MembersTableBodyCell = ({ children, sxProp }) => {
  return (
    <TableCell align="center" sx={sxProp}>
      {children}
    </TableCell>
  );
};

const MembersTable = () => {
  const { isLoading, data: membersData, isError, error } = useGetMembers();
  const { currentThemePalette } = useSwitchThemeContext();

  const tableCellStyle = {
    border: `2px solid ${currentThemePalette.light}`,
    p: 1,
    color: currentThemePalette.text,
  };

  const tableBodyCellStyle = {
    ...tableCellStyle,
    backgroundColor: currentThemePalette.bgPrimary,
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

  const rowPlaceholders = [...Array(5).keys()];
  const columnPlaceholders = [...Array(6).keys()];

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
                {isLoading && <Skeleton />}
                {/* TODO: fix isError render */}
                {isError && <div>{error.message}</div>}
                {!isLoading && header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading &&
            rowPlaceholders.map(slot => (
              <TableRow key={slot}>
                {columnPlaceholders.map(innerSlot => (
                  <TableCell
                    key={innerSlot}
                    align="center"
                    sx={{
                      ...tableCellStyle,
                      backgroundColor: currentThemePalette.bgPrimary,
                    }}>
                    <Skeleton />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {!isLoading &&
            membersData &&
            membersData.map(row => (
              <TableRow key={row.people_id}>
                <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                  {row.full_name}
                </MembersTableBodyCell>
                <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                  {row.assigned_to}
                </MembersTableBodyCell>
                <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                  {row.hired_date_formatted}
                </MembersTableBodyCell>
                <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                  {row.state}
                </MembersTableBodyCell>
                <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                  {row.job_level}
                </MembersTableBodyCell>
                <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                  {row.project}
                </MembersTableBodyCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MembersTable;
