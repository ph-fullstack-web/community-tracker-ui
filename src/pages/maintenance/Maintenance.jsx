import React, {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {Box, Card, Stack, CardContent, Tab, Tabs} from '@mui/material';

import AppButton from "components/common/AppButton.jsx";
import { MaintenanceTabPanel, ProjectsTable, SkillsTable } from 'components/maintenance';
import { FormTextField, PlusIconButton } from "components";
import { useAuthContext } from 'contexts/auth/AuthContext';
import { useCreateProject, useSwitchThemeContext, useGetProjects } from "hooks";
import PageContainer from 'layout/PageContainer';
import { WHITE } from "theme";
import { ProjectFormModal } from "components/maintenance";
import { useNotificationContext } from "contexts/notification/NotificationContext";

const Maintenance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [openAddProjectModal, setOpenAddProjectModal] = useState(false);
  
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { state: { isAuthenticated, credentials : { isMember }}} = useAuthContext();
  const { dispatch: notificationDispatch } = useNotificationContext();
  const { mutate: projectMutate,  } = useCreateProject();
  
  const { refetch } = useGetProjects();

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchField(search);
  }

  const tabLabels = [
    {
      label: 'Skills',
      value: 0,
    },
    {
      label: 'Projects',
      value: 1,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSearch("");
    setSearchField("");
    setTabValue(newValue);
  };

  const handleAddProject = () => {
    setOpenAddProjectModal(true);
  };

  const handleCancelAddProject = () => {
    setOpenAddProjectModal(false);
  }

  const handleConfirmAddProject = (project) => {
    setOpenAddProjectModal(false);
    projectMutate(project, {
      onSuccess: () => {
        notificationDispatch({
          type: 'NOTIFY',
          payload: {
            type: 'success',
            message: 'Project has been added.'
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
  }

  return (
    <PageContainer>
      <Box
        style={{
          marginBottom: "1rem",
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          {tabLabels.map(({label, value}) => (
            <Tab key={value} label={label} id={value} />
          ))}
        </Tabs>
        <Card
          sx={{
            backgroundColor: currentThemePalette.cardSecondary,
            maxWidth: "1430px !important",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{ padding: "2rem 2rem 0px 2rem" }}
          >
            <Box sx={{ width: { xs: "100%", lg: "135ch" }, flex: "0 1 auto" }}>
              <FormTextField 
                sx={{width: "100%"}} 
                placeholder="Search"
                label="Search"
                autoComplete="off"
                value={search}
                onChange={handleSearch} />
            </Box>
            <Box>
              <AppButton
                variant={"contained"}
                sx={{ width: 150, height: 50, ml: { xs: 1, sm: 3 } }}
                startIcon={<SearchIcon />}
                onClick={handleSearchClick}
              >
                Search
              </AppButton>
            </Box>
          </Stack>
          <CardContent
            sx={{
              marginTop: "24px",
              padding: "14px 2rem 0px 2rem",
              backgroundColor:
                currentTheme === "dark"
                  ? "rgba(20, 20, 20, .4)"
                  : "rgba(191, 191, 191, 0.1)",
            }}
          >
            <MaintenanceTabPanel value={tabValue} index={0}>
              <SkillsTable search={searchField} />
            </MaintenanceTabPanel>
            <MaintenanceTabPanel value={tabValue} index={1}>
              {(isAuthenticated && !isMember) && (
                <Box>
                  <PlusIconButton
                    onClickCallback={handleAddProject}
                    sxProp={{
                      "& .MuiSvgIcon-root": {
                        color: `${currentTheme === "dark" ? WHITE : currentThemePalette.dark}!important`,
                      },
                      "&:hover .MuiSvgIcon-root": {
                        color: `${currentTheme === "dark" ? "#141414" : WHITE} !important`,
                      },
                      "&:hover": {
                        backgroundColor: currentTheme === "dark" ? WHITE : currentThemePalette.border
                      },
                      padding: 0
                    }}
                  />
                </Box>
              )}
              <ProjectsTable search={searchField} />
            </MaintenanceTabPanel>
          </CardContent>
        </Card>
        <ProjectFormModal
          open={openAddProjectModal}
          onCancel={handleCancelAddProject}
          onConfirm={handleConfirmAddProject}
        />
      </Box>
    </PageContainer>
  );
};

export default Maintenance;
