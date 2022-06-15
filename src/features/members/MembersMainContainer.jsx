import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { SearchInput, PlusIconButton } from "components";
import MembersTable from "./MembersTable";

const MembersMainContainer = () => {
  const { id: communityId } = useParams();
  const navigate = useNavigate();
  const navigateToCreate = (communityId) => {
    navigate(`/resources/${communityId}/create`);
  };

  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Box
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
      }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ width: { xs: "100%", md: "55ch" }, flex: "0 1 auto" }}>
          <SearchInput onChangeCallback={handleSearch}/>
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
      </Stack>
      <MembersTable search={search} />
    </Box>
  );
};

export default MembersMainContainer;
