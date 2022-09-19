import React, {useState} from 'react';
import {
  Box,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import moment from "moment";
import { useNavigate } from "react-router-dom";

import AppButton from 'components/common/AppButton';
import { useAuthContext } from 'contexts/auth/AuthContext';
import { useGetProjects, useGetJobLevel, useGetWorkState, useSwitchThemeContext } from "hooks";
import { EMPLOYEE_TABLE_HEADERS } from "utils/constants";

const EmployeesTableBodyCell = ({ children, sxProp, ...otherProps }) => {
  return (
    <TableCell sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

export const EmployeeListModal = ({
  employees,
  error,
  isError,
  isLoading,
  open,
  onClose,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { state: {isAuthenticated}} = useAuthContext();
  const navigate = useNavigate();

  const {
    data: jobLevels,
  } = useGetJobLevel();

  const {
    data: projects,
  } = useGetProjects();

  const {
    data: workStates,
  } = useGetWorkState();

  const navigateToUpdate = (communityId, peopleId) => {
    navigate(`/members/${communityId}/update/${peopleId}`);
  };
  
  const rowPlaceholders = [...Array(6).keys()];
  const columnPlaceholders = [...Array(9).keys()];
  
  const tableCellStyle = {
    borderBottom: "none",
    p: 1.7,
    color: currentThemePalette.text,
  };

  const handleClose = () => onClose();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <Dialog
      open={open} 
      onClose={handleClose}
      maxWidth="xl"
      fullWidth={true}
      PaperProps={{
        sx:{
          backgroundColor: currentTheme === "dark" ? "#202124" : null,
          border: currentTheme === "dark" ? `2px solid ${currentThemePalette.light}` : null
        }
      }}
    >
        <DialogTitle
          sx={{
            color: currentThemePalette.text,
            backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
          }}
        >
          Employee List
        </DialogTitle>
        <DialogContent>
          <Box sx={{ overflowX: "auto" }} id="members-table-container">
            <Table
              sx={{
                mt: 0,
                mb: 0.5,
                mx: { xs: 1, sm: 0 },
                minWidth: 825,
                borderCollapse: "separate",
                borderSpacing: "0px 8px",
              }}
              aria-label="members-table">
              <TableHead>
                <TableRow>
                  {EMPLOYEE_TABLE_HEADERS.map((header) => (
                    <TableCell
                      key={header.value}
                      sx={{
                        ...tableCellStyle,
                        fontWeight: "550",
                        borderBottom: "none",
                        backgroundColor: currentThemePalette.opacityBackground,
                        fontSize: "13px",
                      }}>
                      {header.name}
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
                            backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF"
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
                  <TableRow
                    sx={{
                      backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
                  }}>
                    <EmployeesTableBodyCell
                      colSpan={6}
                      sxProp={{ ...tableCellStyle, py: 2.5 }}>
                      Error: {error.message}
                    </EmployeesTableBodyCell>
                  </TableRow>
                </TableBody>
              )}
              {!isLoading && employees?.length === 0 && (
                <TableBody>
                  <TableRow>
                    <EmployeesTableBodyCell
                      colSpan={7}
                      sxProp={{ ...tableCellStyle, py: 2.5 }}>
                      No employees found
                    </EmployeesTableBodyCell>
                  </TableRow>
                </TableBody>
              )}
              {!isLoading && employees?.length > 0 && (
                <>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? employees.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : employees
                    ).map((row) => (
                      <TableRow
                        key={row.people_id}
                        hover
                        sx={{
                          cursor: "pointer",
                          backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
                          "&:hover": {
                            backgroundColor:
                              currentTheme === "dark" ? "#293A46 !important" : null,
                          },
                        }}
                        onClick={() => {
                            if (isAuthenticated) navigateToUpdate(row.community.community_id, row.people_id)
                          }
                        }>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {row.full_name}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {row.cognizantid_id}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {row.community.manager.name}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {row.community.community_name}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {moment(row.hired_date).format(
                            "MM/DD/YYYY"
                          )}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {workStates?.find(workState => workState.work_state_id === row.workstate_id)?.work_state_desc ?? ''}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {jobLevels?.find(level => level.job_level_id === row.joblevel_id)?.job_level_desc ?? ''}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {projects?.find(project => project.id === row.project_id)?.project ?? ''}
                        </EmployeesTableBodyCell>
                        <EmployeesTableBodyCell sxProp={tableCellStyle}>
                          {row.is_probationary ? 'Probationary' : 'Regular'}
                        </EmployeesTableBodyCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow sx={{
                      backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
                    }}>
                      <TablePagination
                        colSpan={10}
                        count={employees.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[]}
                        SelectProps={{
                          sx: {
                            border:
                              currentTheme === "dark"
                                ? `1px solid ${currentThemePalette.light}`
                                : null,
                            borderRadius: currentTheme === "dark" ? 1 : null,
                            "& .MuiSvgIcon-root": {
                              color:
                                currentTheme === "dark"
                                  ? currentThemePalette.light
                                  : null,
                            },
                          },
                          MenuProps: {
                            sx: {
                              "& .MuiList-root": {
                                borderRadius: currentTheme === "dark" ? 1 : null,
                                border:
                                  currentTheme === "dark"
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
                          "& .MuiButtonBase-root.MuiIconButton-root.Mui-disabled": {
                            color: currentTheme === "dark" ? "#293A46" : null,
                          },
                        }}
                      />
                    </TableRow>
                  </TableFooter>
                </>
              )}
            </Table>
          </Box>
        </DialogContent>
        <DialogActions>
          <AppButton onClick={handleClose}>Close</AppButton>
        </DialogActions>
      </Dialog>
  )
};

export default EmployeeListModal;
