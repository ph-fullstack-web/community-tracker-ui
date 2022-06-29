import {
  Typography,
  Card,
  Divider,
  CardContent,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import { PlusIconButton } from "components";
import useGetCommunities from "hooks/communities/useGetCommunities";
import CommunityCard from "./CommunityCard";
import { useNavigate } from "react-router-dom";
import { useSwitchThemeContext } from "hooks";

const CommunityList = () => {
  const navigator = useNavigate();
  // hook to fetch communities
  const { isLoading, data: communityData, isError, error } = useGetCommunities();

  const { currentTheme, currentThemePalette } = useSwitchThemeContext();

  return (
    <Card
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
        border: `3px solid ${currentThemePalette.light}`,
      }}
    >
      <Typography
        component="label"
        align="center"
        sx={{
          padding: "0.25em",
          fontWeight: "700",
          display: "block",
          color:
            currentTheme === "dark" ? currentThemePalette.light : "#FFFFFF",
          backgroundColor: currentThemePalette.bgSecondary,
        }}
      >
        List of Communities
      </Typography>
      <Divider style={{ border: `2px solid ${currentThemePalette.light}` }} />
      {isLoading && (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            marginTop: "5rem",
          }}
        >
          <CircularProgress />
        </Container>
      )}
      {isError && (
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            marginTop: "3rem",
          }}
        >
          <label>{`Error: ${error.message}`}</label>
        </Container>
      )}
      <CardContent
        className="community-container"
        sx={{ backgroundColor: currentThemePalette.bgPrimary }}
      >
        {!isLoading && communityData && (
          <>
            <Grid
              container
              spacing={3}
              className="community-list"
              style={{
                color: "#FFFFFF",
              }}
            >
              {(communityData || []).map((community) => (
                <CommunityCard
                  key={community.community_id}
                  id={community.community_id}
                  image={""}
                  name={community.community_name}
                />
              ))}
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                lg={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PlusIconButton
                  title="Go to input community"
                  ariaLabel="Add community"
                  onClickCallback={() => navigator("/communities/add")}
                  style={{
                    height: "5rem",
                    width: "5rem",
                  }}
                />
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityList;