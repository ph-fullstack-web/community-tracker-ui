import {useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Box,
  Skeleton,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {useSwitchThemeContext} from 'hooks';
import {TABLE_HEADERS} from 'utils/constants';
import {useAuthContext} from 'contexts/auth/AuthContext';

const MembersTableBodyCell = ({children, sxProp, ...otherProps}) => {
  return (
    <TableCell sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

const MembersTable = ({
  search,
  isLoading,
  membersData,
  rowData,
  isError,
  error,
  setFilteredRowData,
}) => {
  const {currentTheme, currentThemePalette} = useSwitchThemeContext();
  const {
    state: {
      isAuthenticated,
      credentials: {isMember},
    },
  } = useAuthContext();

  const navigate = useNavigate();
  const navigateToUpdate = (communityId, peopleId) => {
    navigate(`/members/${communityId}/update/${peopleId}`);
  };

  const [filters, setFilters] = useState([]);

  const rowDataFiltered = useMemo(() => {
    if (!search) return rowData;

    return rowData.filter(member => {
      if (filters.length === 0) {
        // Loop over member object and see if search is matched
        // to at least one property value
        for (const property in member) {
          if (property === 'people_id') continue;

          let queryFound = false;
          if (property === 'is_probationary') {
            queryFound =
              (member[property] === true &&
                'probationary'.includes(search.toLowerCase())) ||
              (member[property] === false &&
                'regular'.includes(search.toLowerCase()));
          } else {
            queryFound = member[property]
              ?.toLowerCase()
              .includes(search.toLowerCase());
          }

          if (!queryFound) continue;

          return true;
        }
      } else {
        // Also loop over like in the if statement above
        // but add another validation that checks if current property
        // is not included in filters state so that it can skip it
        for (const property in member) {
          if (property === 'people_id' || !filters.includes(property)) {
            continue;
          }

          let queryFound = false;
          if (property === 'is_probationary') {
            queryFound =
              (member[property] === true &&
                'probationary'.includes(search.toLowerCase())) ||
              (member[property] === false &&
                'regular'.includes(search.toLowerCase()));
          } else {
            queryFound = member[property]
              ?.toLowerCase()
              .includes(search.toLowerCase());
          }

          if (!queryFound) continue;

          return true;
        }
      }

      return false;
    });
  }, [rowData, search, filters]);

  const handleCheckboxChange = (event, headerValue) => {
    let filterArray = [];

    if (event.target.checked) {
      filterArray = [...filters, headerValue];
    } else {
      filterArray = filters.filter(filter => filter !== headerValue);
    }

    setFilters(filterArray);
  };

  const tableCellStyle = {
    borderBottom: 'none',
    p: 1.7,
    color: currentThemePalette.text,
  };

  const rowPlaceholders = [...Array(5).keys()];
  const columnPlaceholders = [...Array(6).keys()];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Automatically scroll to top with some conditions
  useEffect(() => {
    if (rowsPerPage !== 10) {
      document.querySelector('body').scrollIntoView({behavior: 'smooth'});
    }
  }, [page, rowsPerPage]);

  // Reset page count when search always changes
  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    setFilteredRowData(rowDataFiltered);
  }, [rowDataFiltered, setFilteredRowData]);

  return (
    <Box sx={{overflowX: 'auto'}} id="members-table-container">
      <Table
        sx={{
          mt: 0,
          mb: 0.5,
          mx: {xs: 1, sm: 0},
          minWidth: 825,
          borderCollapse: 'separate',
          borderSpacing: '0px 8px',
        }}
        aria-label="members-table"
      >
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map(header => (
              <TableCell
                key={header.value}
                sx={{
                  ...tableCellStyle,
                  fontWeight: '550',
                  borderBottom: 'none',
                  backgroundColor: currentThemePalette.opacityBackground,
                  fontSize: '13px',
                }}
              >
                {header.name}
                <Checkbox
                  icon={<FilterAltOutlinedIcon />}
                  checkedIcon={<FilterAltIcon />}
                  size="small"
                  sx={{
                    color:
                      currentTheme === 'dark'
                        ? currentThemePalette.light
                        : '#293A46',
                    '&.Mui-checked': {
                      color:
                        currentTheme === 'dark'
                          ? currentThemePalette.light
                          : '#293A46',
                    },
                    margin: '-10px 0',
                  }}
                  onChange={event => handleCheckboxChange(event, header.value)}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {isLoading && (
          <TableBody>
            {rowPlaceholders.map(slot => (
              <TableRow key={slot}>
                {columnPlaceholders.map(innerSlot => (
                  <TableCell
                    key={innerSlot}
                    align="center"
                    sx={{
                      ...tableCellStyle,
                      backgroundColor:
                        currentTheme === 'dark'
                          ? currentThemePalette.medium
                          : '#FFFFFF',
                    }}
                  >
                    <Skeleton
                      sx={{
                        backgroundColor:
                          currentTheme === 'dark'
                            ? currentThemePalette.light
                            : null,
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
        {isError && (
          <TableBody>
            <TableRow
              sx={{
                backgroundColor:
                  currentTheme === 'dark'
                    ? currentThemePalette.medium
                    : '#FFFFFF',
              }}
            >
              <MembersTableBodyCell
                colSpan={6}
                sxProp={{...tableCellStyle, py: 2.5}}
              >
                Error: {error.message}
              </MembersTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading && rowDataFiltered && rowDataFiltered.length === 0 && (
          <TableBody>
            <TableRow>
              <MembersTableBodyCell
                colSpan={7}
                sxProp={{...tableCellStyle, py: 2.5}}
              >
                {search || filters.length > 0
                  ? 'No search results found'
                  : 'No members found for this community'}
              </MembersTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading && rowDataFiltered && rowDataFiltered.length > 0 && (
          <>
            <TableBody>
              {(rowsPerPage > 0
                ? rowDataFiltered.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rowDataFiltered
              ).map(row => (
                <TableRow
                  key={row.people_id}
                  hover
                  sx={{
                    cursor: 'pointer',
                    backgroundColor:
                      currentTheme === 'dark'
                        ? currentThemePalette.medium
                        : '#FFFFFF',
                    '&:hover': {
                      backgroundColor:
                        currentTheme === 'dark' ? '#293A46 !important' : null,
                    },
                  }}
                  onClick={() => {
                    if (isAuthenticated && !isMember)
                      navigateToUpdate(membersData.community_id, row.people_id);
                  }}
                >
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.full_name}
                  </MembersTableBodyCell>
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.assigned_to}
                  </MembersTableBodyCell>
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.hired_date_formatted}
                  </MembersTableBodyCell>
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.work_state}
                  </MembersTableBodyCell>
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.job_level}
                  </MembersTableBodyCell>
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.project}
                  </MembersTableBodyCell>
                  <MembersTableBodyCell sxProp={tableCellStyle}>
                    {row.is_probationary ? 'Probationary' : 'Regular'}
                  </MembersTableBodyCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow
                sx={{
                  backgroundColor:
                    currentTheme === 'dark'
                      ? currentThemePalette.medium
                      : '#FFFFFF',
                }}
              >
                <TablePagination
                  colSpan={7}
                  count={rowDataFiltered.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  SelectProps={{
                    sx: {
                      border:
                        currentTheme === 'dark'
                          ? `1px solid ${currentThemePalette.light}`
                          : null,
                      borderRadius: currentTheme === 'dark' ? 1 : null,
                      '& .MuiSvgIcon-root': {
                        color:
                          currentTheme === 'dark'
                            ? currentThemePalette.light
                            : null,
                      },
                    },
                    MenuProps: {
                      sx: {
                        '& .MuiList-root': {
                          borderRadius: currentTheme === 'dark' ? 1 : null,
                          border:
                            currentTheme === 'dark'
                              ? `1px solid ${currentThemePalette.light} !important`
                              : null,
                          backgroundColor: currentThemePalette.bgPrimary,
                          color: currentThemePalette.text,
                        },
                      },
                    },
                  }}
                  sx={{
                    ...tableCellStyle,
                    '& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled': {
                      color: currentTheme === 'dark' ? '#293A46' : null,
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
    </Box>
  );
};

export default MembersTable;
