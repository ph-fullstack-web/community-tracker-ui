import { useState } from "react";
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
import useSwitchThemeContext from "hooks/Theme/useSwitchThemeContext";
import useGetMembers from "hooks/People/useGetMembers";
import { JobLevels } from "utils/constants/JobLevels";
import { WorkStates } from "utils/constants/WorkStates";
import { Projects } from "utils/constants/Projects";

const MembersTableBodyCell = ({ children, sxProp, ...otherProps }) => {
  return (
    <TableCell align="center" sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

const MembersTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { isLoading, data: membersData, isError, error } = useGetMembers(id);
  const membersDataModified = membersData
    ? Object.assign(membersData, {
        members: membersData?.members.map((member) => ({
          ...member,
          hired_date_formatted: moment(member.hired_date).format("MM/DD/YYYY"),
          job_level: JobLevels[member.joblevel_id],
          work_state: WorkStates[member.workstate_id],
          project: Projects[member.project_id],
        })),
      })
    : null;

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

  const navigateToUpdate = (communityId, cognizantId) => {
    navigate(`/resources/${communityId}/update/${cognizantId}`);
  };

  return (
    <Box sx={{ overflowX: "auto" }}>
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
          membersDataModified &&
          membersDataModified.members.length === 0 && (
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
          membersDataModified &&
          membersDataModified.members.length > 0 && (
            <>
              <TableBody>
                {(rowsPerPage > 0
                  ? membersDataModified.members.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : membersDataModified.members
                ).map((row) => (
                  <TableRow
                    key={row.cognizantid_id}
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigateToUpdate(
                        membersDataModified.community_id,
                        row.cognizantid_id
                      )
                    }>
                    <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                      {row.full_name}
                    </MembersTableBodyCell>
                    <MembersTableBodyCell sxProp={tableBodyCellStyle}>
                      {membersDataModified.manager?.full_name}
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
                    count={membersDataModified.members.length}
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
