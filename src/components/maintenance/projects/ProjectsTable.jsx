import {useState, useEffect, useMemo} from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  Skeleton,
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {ConfirmModal} from 'components';
import {useNotificationContext} from 'contexts/notification/NotificationContext';
import {
  useGetProjects,
  useSwitchThemeContext,
  useDeleteProject,
  useUpdateProject,
} from 'hooks';
import {ProjectFormModal} from '.';

const ProjectsTableBodyCell = ({children, sxProp, ...otherProps}) => {
  return (
    <TableCell sx={sxProp} {...otherProps}>
      {children}
    </TableCell>
  );
};

export const ProjectsTable = ({search}) => {
  const TABLE_HEADERS = [
    {value: 'name', name: 'Project', filter: true},
    {value: 'code', name: 'Code', filter: true},
    {value: 'is_active', name: 'Status', filter: true},
    {value: 'actions', name: 'Actions', filter: false},
  ];

  const {currentTheme, currentThemePalette} = useSwitchThemeContext();
  const {dispatch: notificationDispatch} = useNotificationContext();

  const {
    isLoading,
    data: projectsData,
    isError,
    error,
    refetch,
  } = useGetProjects();
  const {mutate} = useDeleteProject();
  const {mutate: updateProjectMutate} = useUpdateProject();

  const sortProjects = (a, b) => {
    const projectA = a.name.toLowerCase();
    const projectB = b.name.toLowerCase();

    if (projectA < projectB) return -1;
    if (projectA > projectB) return 1;
    return 0;
  };

  const rowData = useMemo(
    () =>
      projectsData
        ? projectsData
            .map(project => ({
              id: project.id,
              name: project.project,
              code: project.project_code,
              is_active: project.is_active,
            }))
            .sort(sortProjects)
        : null,
    [projectsData]
  );

  const [filters, setFilters] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(undefined);

  const rowDataFiltered = useMemo(() => {
    if (!search) return rowData;

    return rowData.filter(project => {
      if (filters.length === 0) {
        // Loop over member object and see if search is matched
        // to at least one property value
        for (const property in project) {
          if (property === 'id') continue;

          let queryFound = false;
          if (property === 'name') {
            queryFound = project[property]
              .toLowerCase()
              .includes(search.toLowerCase());
          } else if (property === 'is_active') {
            queryFound =
              (project[property] === true &&
                'active'.includes(search.toLowerCase())) ||
              (project[property] === false &&
                'inactive'.includes(search.toLowerCase()));
          }

          if (!queryFound) continue;

          return true;
        }
      } else {
        // Also loop over like in the if statement above
        // but add another validation that checks if current property
        // is not included in filters state so that it can skip it
        for (const property in project) {
          if (property === 'id' || !filters.includes(property)) {
            continue;
          }

          let queryFound = false;
          if (property === 'name') {
            queryFound = project[property]
              .toLowerCase()
              .includes(search.toLowerCase());
          } else if (property === 'is_active') {
            queryFound =
              (project[property] === true &&
                'active'.includes(search.toLowerCase())) ||
              (project[property] === false &&
                'inactive'.includes(search.toLowerCase()));
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
  const columnPlaceholders = [...Array(4).keys()];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteButtonClick = project => {
    setSelectedProject(project);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
    setSelectedProject(undefined);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteModal(false);
    mutate(selectedProject.id, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: `${selectedProject.name} has been deleted.`,
          },
        });
        refetch();
      },
      onError: error => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'error',
            message: error.message,
          },
        });
      },
    });
    setSelectedProject(undefined);
  };

  const handleUpdateButtonClick = project => {
    setSelectedProject(project);
    setOpenUpdateModal(true);
  };

  const handleCancelUpdate = () => {
    setOpenUpdateModal(false);
    setSelectedProject(undefined);
  };

  const handleConfirmUpdate = project => {
    setOpenUpdateModal(false);
    const args = {
      projectId: project.id,
      payload: project,
    };
    updateProjectMutate(args, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Project has been updated.',
          },
        });
        refetch();
      },
      onError: error => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'error',
            message: error.message,
          },
        });
      },
    });
    setSelectedProject(undefined);
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

  return (
    <Box sx={{overflowX: 'auto'}} id="projects-table-container">
      <Table
        sx={{
          mt: 0,
          mb: 0.5,
          mx: {xs: 1, sm: 0},
          minWidth: 825,
          borderCollapse: 'separate',
          borderSpacing: '0px 8px',
        }}
        aria-label="projects-table"
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
              <ProjectsTableBodyCell
                colSpan={6}
                sxProp={{...tableCellStyle, py: 2.5}}
              >
                Error: {error.message}
              </ProjectsTableBodyCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading && rowDataFiltered && rowDataFiltered.length === 0 && (
          <TableBody>
            <TableRow>
              <ProjectsTableBodyCell
                colSpan={6}
                sxProp={{...tableCellStyle, py: 2.5}}
              >
                {search || filters.length > 0
                  ? 'No search results found'
                  : 'No projects found'}
              </ProjectsTableBodyCell>
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
                >
                  <ProjectsTableBodyCell sxProp={tableCellStyle}>
                    {row.name}
                  </ProjectsTableBodyCell>
                  <ProjectsTableBodyCell sxProp={tableCellStyle}>
                    {row.code}
                  </ProjectsTableBodyCell>
                  <ProjectsTableBodyCell sxProp={tableCellStyle}>
                    {row.is_active ? 'Active' : 'Inactive'}
                  </ProjectsTableBodyCell>
                  <ProjectsTableBodyCell sxProp={{...tableCellStyle, p: 0}}>
                    <Box>
                      <IconButton
                        sx={{
                          color:
                            currentTheme === 'dark'
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
                            currentTheme === 'dark'
                              ? currentThemePalette.light
                              : currentThemePalette.dark,
                        }}
                        size="small"
                        onClick={() => handleDeleteButtonClick(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ProjectsTableBodyCell>
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
      {selectedProject && openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          title={'Delete project?'}
          message={`Are you sure you want to delete ${selectedProject.name}?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      {selectedProject && openUpdateModal && (
        <ProjectFormModal
          open={openUpdateModal}
          projectProp={selectedProject}
          onCancel={handleCancelUpdate}
          onConfirm={handleConfirmUpdate}
        />
      )}
    </Box>
  );
};
