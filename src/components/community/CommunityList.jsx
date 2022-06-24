import {
  Typography,
  Card,
  Divider,
  CardContent,
  IconButton,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useGetCommunities from "hooks/communities/useGetCommunities";
import CommunityCard from "./CommunityCard";
import { useNavigate } from "react-router-dom";
const CommunityList = () => {
  const navigator = useNavigate();
  // hook to fetch communities
  const { isLoading, data: communityData, isError, error } = useGetCommunities();

  return (
    <Card
      style={{
        marginTop: "3rem",
        marginBottom: "1rem",
        border: "3px solid #9fafc1",
      }}
    >
      <Typography
        component="label"
        align="center"
        sx={{
          color: "#798da3",
          padding: "0.25em",
          fontWeight: "700",
          display: "block",
          backgroundColor: "#e6e6e6",
        }}
      >
        List of Communities
      </Typography>
      <Divider style={{ border: "2px solid #9fafc1" }} />
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
      {
          isError && (
            <Container
              style={{
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                marginTop: "3rem",
              }}
            >
              <label>{`Error: ${error.message}`}</label>
            </Container>)
          
      }
      <CardContent className="community-container">
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
                <IconButton
                  title="Go to input community"
                  color="primary"
                  size="medium"
                  aria-label="Add community"
                  style={{
                    height: "5rem",
                    width: "5rem",
                  }}
                  onClick={() => navigator('/communities/add')}
                >
                  <AddCircleOutlineIcon
                    fontSize="large"
                    style={{
                      color: "#74808d",
                      fontWeight: "700",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityList;