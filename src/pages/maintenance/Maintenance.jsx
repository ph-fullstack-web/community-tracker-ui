import React, {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {Box, Card, Stack, CardContent, Tab, Tabs} from '@mui/material';

import AppButton from "components/common/AppButton.jsx";
import { MaintenanceTabPanel, ProjectsTable, SkillsTable } from 'components/maintenance';
import { FormTextField } from "components";
import {  useSwitchThemeContext } from "hooks";
import PageContainer from 'layout/PageContainer';


const Maintenance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

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

  return (
    <PageContainer>
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          {tabLabels.map(({label, value}) => (
            <Tab key={value} label={label} id={value} />
          ))}
        </Tabs>
      </Box>
      <Box
      style={{
        marginBottom: "1rem",
      }}>
        <Card
          sx={{padding: "2rem", backgroundColor: currentThemePalette.cardSecondary}}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: { xs: "100%", md: "55ch" }, flex: "0 1 auto" }}>
              <FormSearchInput value={search} onChangeCallback={handleSearch} />
            </Box>
          </Stack>
          <MaintenanceTabPanel value={tabValue} index={0}>
            <SkillsTable search={search} />
          </MaintenanceTabPanel>
          <MaintenanceTabPanel value={tabValue} index={1}>
            <ProjectsTable search={search} />
          </MaintenanceTabPanel>
        </Card>
      </Box> */}
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
              <ProjectsTable search={searchField} />
            </MaintenanceTabPanel>
          </CardContent>
        </Card>
      </Box>
    </PageContainer>
  );
};

export default Maintenance;
