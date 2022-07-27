import React, {useState} from 'react';
import {Box, Card, Stack, Tab, Tabs} from '@mui/material';

import { MaintenanceTabPanel, ProjectsTable, SkillsTable } from 'components/maintenance';
import { FormSearchInput } from "components";
import {  useSwitchThemeContext } from "hooks";
import PageContainer from 'layout/PageContainer';


const Maintenance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState("");
  
  const { currentThemePalette } = useSwitchThemeContext();

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

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
    setTabValue(newValue);
  };

  return (
    <PageContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
      </Box>
    </PageContainer>
  );
};

export default Maintenance;
