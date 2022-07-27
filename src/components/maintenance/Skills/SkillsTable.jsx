import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ConfirmModal } from "components";
import { useNotificationContext } from "contexts/notification/NotificationContext";
import { useSwitchThemeContext, useDeleteSkill, useGetSkills, useUpdateSkill} from "hooks";
import { SkillFormModal } from ".";

const SkillsTableBodyCell = ({ children, sxProp, ...otherProps }) => {
  return (
    <TableCell align="center" sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

export const SkillsTable = ({
  search,
}) => {
  const TABLE_HEADERS = [
    { value: "peopleskills_desc", name: "Description", filter: true },
    { value: "is_active", name: "Status", filter: true },
    { value: "actions", name: "Actions", filter: false },
  ];

  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { dispatch: notificationDispatch } = useNotificationContext();

  const {
    isLoading,
    data: skillsData,
    isError,
    error,
    refetch,
  } = useGetSkills();
  const { mutate } = useDeleteSkill();
  const { mutate: updateSkillMutate } = useUpdateSkill()

  const sortSkills = ((a, b) => {
    const skillA = a.peopleskills_desc.toLowerCase();
    const skillB = b.peopleskills_desc.toLowerCase();

    if (skillA < skillB) return -1;
    if (skillA > skillB) return 1;
    return 0;
  });

  const rowData = useMemo(
    () =>
      skillsData
        ? skillsData.map((skill) => ({
            peopleskills_id: skill.peopleskills_id,
            peopleskills_desc: skill.peopleskills_desc,
            is_active: skill.is_active,
          })).sort(sortSkills)
        : null,
    [skillsData]
  );  

  const [filters, setFilters] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(undefined);

  const rowDataFiltered = useMemo(() => {
    if (!search) return rowData;

    return rowData.filter((skill) => {
      if (filters.length === 0) {
        // Loop over member object and see if search is matched
        // to at least one property value
        for (const property in skill) {
          if (property === "peopleskills_id") continue;

          let queryFound = false;
          if (property === "peopleskills_desc") {
            queryFound = skill[property]
              .toLowerCase()
              .includes(search.toLowerCase());
          } else if (property === "is_active") {
            queryFound = (skill[property] === true && "active".includes(search.toLowerCase())) ||
              (skill[property] === false && "inactive".includes(search.toLowerCase()));
          }

          if (!queryFound) continue;

          return true;
        }
      } else {
        // Also loop over like in the if statement above
        // but add another validation that checks if current property
        // is not included in filters state so that it can skip it
        for (const property in skill) {
          if (property === "peopleskills_id" || !filters.includes(property)) {
            continue;
          }

          let queryFound = false;
          if (property === "peopleskills_desc") {
            queryFound = skill[property]
              .toLowerCase()
              .includes(search.toLowerCase());
          } else if (property === "is_active") {
            queryFound = (skill[property] === true && "active".includes(search.toLowerCase())) ||
              (skill[property] === false && "inactive".includes(search.toLowerCase()));
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
      filterArray = filters.filter((filter) => filter !== headerValue);
    }

    setFilters(filterArray);
  };

  const tableCellStyle = {
    border: `2px solid ${currentThemePalette.light}`,
    p: 1,
    color: currentThemePalette.text,
  };

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

  const handleDeleteButtonClick = (skill) => {
    setSelectedSkill(skill);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setSelectedSkill(undefined);
  }

  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
    mutate(selectedSkill.peopleskills_id, {
      onSuccess: (response) => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: `${selectedSkill.peopleskills_desc} has been deleted.`
          }
        });
        refetch();
      },
      onError: (error) => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'error',
            message: error.message
          }
        });
      },
    })
    setSelectedSkill(undefined);
  }

  const handleUpdateButtonClick = (skill) => {
    setSelectedSkill(skill);
    setOpenUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setOpenUpdateModal(false);
    setSelectedSkill(undefined);
  }

  const handleConfirmUpdate = (skill) => {
    setOpenUpdateModal(false);
    const args = {
      peopleSkillId: skill.peopleskills_id,
      payload: skill
    }
    updateSkillMutate(args, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Skill has been updated.'
          }
        });
        refetch();
      },
      onError: (error) => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'error',
            message: error.message
          }
        });
      }
    });
    setSelectedSkill(undefined);
  }

  // Automatically scroll to top with some conditions
  useEffect(() => {
    if (rowsPerPage !== 10) {
      document.querySelector("body").scrollIntoView({ behavior: "smooth" });
    }
  }, [page, rowsPerPage]);

  // Reset page count when search always changes
  useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <Box sx={{ overflowX: "auto" }} id="skills-table-container">
      <Table
        sx={{ mb: 0.5, mx: { xs: 1, sm: 0 }, minWidth: 825 }}
        aria-label="skills-table">
        <TableHead>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableCell
                key={header.value}
                align="center"
                sx={{
                  ...tableCellStyle,
                  fontWeight: "bold",
                  backgroundColor:
                    currentTheme === "dark"
                      ? currentThemePalette.dark
                      : currentThemePalette.medium,
                }}
              >
              <FormControlLabel
                value={header.value}
                control={
                  header.filter ? (
                    <Checkbox
                      icon={<FilterAltOutlinedIcon />}
                      checkedIcon={<FilterAltIcon />}
                      sx={{
                        color:
                          currentTheme === "dark"
                            ? currentThemePalette.light
                            : "#293A46",
                        "&.Mui-checked": {
                          color:
                            currentTheme === "dark"
                              ? currentThemePalette.light
                              : "#293A46",
                        },
                      }}
                      onChange={(event) =>
                        handleCheckboxChange(event, header.value)
                      }
                    />
                 ) : <></>
                }
                label={header.name}
                labelPlacement="start"
              />
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
              <SkillsTableBodyCell
                colSpan={6}
                sxProp={{ ...tableCellStyle, py: 2.5 }}>
                Error: {error.message}
              </SkillsTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading && rowDataFiltered && rowDataFiltered.length === 0 && (
          <TableBody>
            <TableRow>
              <SkillsTableBodyCell
                colSpan={6}
                sxProp={{ ...tableCellStyle, py: 2.5 }}>
                {search || filters.length > 0
                  ? "No search results found"
                  : "No skills found"}
              </SkillsTableBodyCell>
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
                  }}>
                  <SkillsTableBodyCell sxProp={tableCellStyle}>
                    {row.peopleskills_desc}
                  </SkillsTableBodyCell>
                  <SkillsTableBodyCell sxProp={tableCellStyle}>
                    {row.is_active ? "Active" : "Inactive"}
                  </SkillsTableBodyCell>
                  <SkillsTableBodyCell sxProp={{...tableCellStyle, p:0}}>
                    <Box>
                      <IconButton 
                        sx={{
                          color:
                            currentTheme === "dark"
                              ? currentThemePalette.light
                              : currentThemePalette.dark,
                        }}
                        size="small" 
                        onClick={() => handleUpdateButtonClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        sx={{
                          color:
                            currentTheme === "dark"
                              ? currentThemePalette.light
                              : currentThemePalette.dark,
                        }}
                        size="small" 
                        onClick={() => handleDeleteButtonClick(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </SkillsTableBodyCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow sx={{
                backgroundColor: currentTheme === "dark" ? currentThemePalette.medium : "#FFFFFF",
              }}>
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
      {selectedSkill && openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          title={'Delete skill?'}
          message={`Are you sure you want to delete ${selectedSkill.peopleskills_desc}?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {selectedSkill && openUpdateModal && (
        <SkillFormModal
          open={openUpdateModal}
          skillProp={selectedSkill}
          onCancel={handleCancelUpdate}
          onConfirm={handleConfirmUpdate}
        />
      )}
    </Box>
  );
};
