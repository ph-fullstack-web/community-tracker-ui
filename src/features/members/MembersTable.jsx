import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { JobLevels, WorkStates, Projects } from "utils/constants";
import { useSwitchThemeContext, useGetMembers } from "hooks/";

const MembersTableBodyCell = ({ children, sxProp, ...otherProps }) => {
  return (
    <TableCell align="center" sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

const MembersTable = ({search}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const navigateToUpdate = (communityId, peopleId) => {
    navigate(`/resources/${communityId}/update/${peopleId}`);
  };

  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { isLoading, data: membersData, isError, error } = useGetMembers(id);

  const rowData = useMemo(() => membersData
  ? membersData.members.map((member) => ({
    people_id: member.people_id,
    full_name: member.full_name,
    assigned_to: membersData.manager?.full_name,
    hired_date_formatted: moment(member.hired_date).format("MM/DD/YYYY"),
    job_level: JobLevels[member.joblevel_id],
    work_state: WorkStates[member.workstate_id],
    project: Projects[member.project_id],
  }))
  : null, [membersData]);

  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 500);
  //   };
  // };

  // const rowDataFiltered = useMemo(() => debounce(() => {
  //   if (!search) return rowData

  //   return rowData.filter(member => {
  //     for (const property in member) {
  //       if (property === "people_id") continue;

  //       const queryFound = member[property].toLowerCase().includes(search.toLowerCase())
  //       console.log("queryFound", queryFound)
      

  //       if(!queryFound) continue;

  //       return true
  //     }

  //     return false
  //   })
  // }), [rowData, search])

  const rowDataFiltered = useMemo(() => {
    if (!search) return rowData

    return rowData.filter(member => {
      for (const property in member) {
        if (property === "people_id") continue;

        const queryFound = member[property].toLowerCase().includes(search.toLowerCase())

        if(!queryFound) continue;

        return true
      }

      return false
    })
  }, [rowData, search])

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
    "Name",
    "Assigned To",
    "Hired Date",
    "State",
    "Job Level",
    "Project",
  ];

  const rowPlaceholders = [...Array(5).keys()];
  const columnPlaceholders = [...Array(6).keys()];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Automatically scroll to top with some conditions
  useEffect(() => {
    if (rowsPerPage !== 10) {
      document.querySelector("body").scrollIntoView();
    }
  }, [page, rowsPerPage]);

  return (
    <Box sx={{ overflowX: "auto" }} id="members-table-container">
      <Table
        sx={{ mt: 3, mb: 0.5, mx: { xs: 1, sm: 0 }, minWidth: 825 }}
        aria-label="members-table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell
                key={header}
                align="center"
                sx={{
                  ...tableCellStyle,
                  fontWeight: "bold",
                  backgroundColor: currentThemePalette.bgSecondary,
                }}>
                {isLoading && (
                  <Skeleton
                    sx={{
                      backgroundColor:
                        currentTheme === "dark"
                          ? currentThemePalette.light
                          : null,
                    }}
                  />
                )}
                {!isLoading && header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {isLoading && (
          <TableBody>
            {rowPlaceholders.map((slot) => (
              <TableRow key={slot}>
                {columnPlaceholders.map((innerSlot) => (
                  <TableCell
                    key={innerSlot}
                    align="center"
                    sx={{
                      ...tableCellStyle,
                      backgroundColor: currentThemePalette.bgPrimary,
                    }}>
                    <Skeleton
                      sx={{
                        backgroundColor:
                          currentTheme === "dark"
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
            <TableRow>
              <MembersTableBodyCell
                colSpan={6}
                sxProp={{ ...tableBodyCellStyle, py: 2.5 }}>
                Error: {error.message}
              </MembersTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading &&
          rowDataFiltered &&
          rowDataFiltered.length === 0 && (
            <TableBody>
              <TableRow>
                <MembersTableBodyCell
                  colSpan={6}
                  sxProp={{ ...tableBodyCellStyle, py: 2.5 }}>
                  No members found for this community
                </MembersTableBodyCell>
              </TableRow>
            </TableBody>
          )}
        {!isLoading &&
          rowDataFiltered &&
          rowDataFiltered.length > 0 && (
            <>
              <TableBody>
                {(rowsPerPage > 0
                  ? rowDataFiltered.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                  : rowDataFiltered
                ).map((row) => (
                  <TableRow
                    key={row.people_id}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigateToUpdate(
                        membersData.community_id,
                        row.people_id
                      )
                    }>
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
                      {row.work_state}
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
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={6}
                    count={rowDataFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    SelectProps={{
                      sx: {
                        border:
                          currentTheme === "dark"
                            ? `1px solid ${currentThemePalette.light}`
                            : null,
                        "& .MuiList-root": {
                          borderRadius: currentTheme === "dark" ? 1 : null,
                          border:
                            currentTheme === "dark"
                              ? `1px solid ${currentThemePalette.light}`
                              : null,
                          backgroundColor: currentThemePalette.bgPrimary,
                          color: currentThemePalette.text,
                        },
                      },
                    }}
                    sx={tableCellStyle}
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
