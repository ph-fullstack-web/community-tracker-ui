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
import useGetCommunities from "hooks/useGetCommunities";
import CommunityCard from "./CommunityCard";

const CommunityList = () => {
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
          isError && <label>{`Error: ${error.message}`}</label>
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
                  key={community.id}
                  id={community.id}
                  color={community.color}
                  image={community.image}
                  name={community.name}
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
                  size="large"
                  aria-label="Add community"
                  style={{
                    height: "5rem",
                    width: "5rem",
                  }}
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