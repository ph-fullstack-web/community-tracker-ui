import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { Box, Stack, Card, CardContent } from "@mui/material";
import { FormTextField, PlusIconButton } from "components";
import { JOB_LEVELS, WORK_STATES, PROJECTS } from "utils/constants";
import { useGetMembers } from "hooks";
import ExportButton from "components/members/ExportButton";
import MembersTable from "./MembersTable";
import {  useSwitchThemeContext } from "hooks";
import { useEffect } from "react";
import { WHITE } from "theme";
import { TABLE_HEADERS } from "utils/constants";
import { useAuthContext } from 'contexts/auth/AuthContext';
import AppButton from "components/common/AppButton.jsx";
import SearchIcon from "@mui/icons-material/Search";

const MembersMainContainer = () => {
  const {state: {isAuthenticated}} = useAuthContext();
  const { communityId } = useParams();
  const navigate = useNavigate();
  const navigateToCreate = (communityId) => {
    navigate(`/members/${communityId}/create`);
  };
  
  const {
    isLoading,
    data: membersData,
    isError,
    error,
    refetch
  } = useGetMembers(communityId);

  useEffect(() => {
    refetch();
  }, [communityId, refetch]);

  const rowData = useMemo(
    () =>
      membersData
        ? membersData.members.map((member) => ({
            people_id: member.people_id,
            full_name: member.full_name,
            assigned_to: membersData.manager?.full_name,
            hired_date_formatted: moment(member.hired_date).format(
              "MM/DD/YYYY"
            ),
            job_level: JOB_LEVELS[member.joblevel_id],
            work_state: WORK_STATES[member.workstate_id],
            project: PROJECTS[member.project_id],
            is_probationary: member.is_probationary
          }))
        : null,
    [membersData]
  );
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [filteredRowData, setFilteredRowData] = useState(rowData);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  const handleSearchClick = () => {
    setSearchField(search);
  }
  return (
  <Box
    style={{
      marginBottom: "1rem",
    }}
  >
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
        <Stack direction="row">
          {isAuthenticated && (
            <Box>
              <PlusIconButton
                title="Go to Input Page"
                ariaLabel="Go to Input Page"
                onClickCallback={() => navigateToCreate(communityId)}
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
          <Box sx={{ ml: "auto" }}>
            <ExportButton
              isLoading={isLoading}
              membersData={membersData}
              rowData={filteredRowData?.map(data => {
                return {...data, is_probationary: data.is_probationary ? 'Probationary' : 'Regular'}
              })}
              isError={isError}
              error={error}
              tableHeaders={TABLE_HEADERS}
            />
          </Box>
        </Stack>
        <MembersTable
          search={searchField}
          isLoading={isLoading}
          membersData={membersData}
          rowData={rowData}
          isError={isError}
          error={error}
          setFilteredRowData={setFilteredRowData}
        />
      </CardContent>
    </Card>
  </Box>
  );
};

export default MembersMainContainer;
