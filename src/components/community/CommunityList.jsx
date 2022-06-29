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
import CustomContainer from "components/common/CustomContainer";
const CommunityList = () => {
  const navigator = useNavigate();
  // hook to fetch communities
  const { isLoading, data: communityData, isError, error } = useGetCommunities();

  return (
    <>


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
                    fontSize: "4rem"
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CommunityList;