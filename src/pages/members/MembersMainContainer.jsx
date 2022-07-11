import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { Box, Stack, Card } from "@mui/material";
import { FormSearchInput, PlusIconButton } from "components";
import { JOB_LEVELS, WORK_STATES, PROJECTS } from "utils/constants";
import { useGetMembers } from "hooks";
import ExportButton from "components/members/ExportButton";
import MembersTable from "./MembersTable";
import {  useSwitchThemeContext } from "hooks";
import { useEffect } from "react";

const MembersMainContainer = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const navigateToCreate = (communityId) => {
    navigate(`/resources/${communityId}/create`);
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
          }))
        : null,
    [membersData]
  );

  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const { currentThemePalette } = useSwitchThemeContext();

  return (
    <Box
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
      }}>
        <Card
          sx={{padding: "2rem", backgroundColor: currentThemePalette.card}}>
          <Stack direction="row" alignItems="center">
            <Box sx={{ width: { xs: "100%", md: "55ch" }, flex: "0 1 auto" }}>
              <FormSearchInput onChangeCallback={handleSearch} />
            </Box>
            <Box>
              <PlusIconButton
                title="Go to Input Page"
                ariaLabel="Go to Input Page"
                onClickCallback={() => navigateToCreate(communityId)}
                sxProp={{
                  ml: { xs: 1, sm: 3 },
                }}
              />
            </Box>
            <Box sx={{ ml: "auto" }}>
              <ExportButton
                isLoading={isLoading}
                membersData={membersData}
                rowData={rowData}
                isError={isError}
                error={error}
              />
            </Box>
          </Stack>
       
          <MembersTable
            search={search}
            isLoading={isLoading}
            membersData={membersData}
            rowData={rowData}
            isError={isError}
            error={error}
          />
       </Card>
    </Box>
  );
};

export default MembersMainContainer;
