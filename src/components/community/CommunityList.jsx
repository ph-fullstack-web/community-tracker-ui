import {
  Card,
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
import React, { useState, useEffect } from "react";
import { useAuthContext } from 'contexts/auth/AuthContext';

const CommunityList = () => {
  const navigator = useNavigate();
  const [communityListData, setCommunityListData] = useState([]);
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  const { state: { isAuthenticated, credentials : { isMember }}} = useAuthContext();
  // hook to fetch communities
  const {
    isLoading,
    data: communityData,
    isError,
    error,
    refetch,
  } = useGetCommunities();

  useEffect(() => {
    if (!isLoading) {
      setCommunityListData(communityData ? communityData : []);
    }
  }, [communityData, isLoading]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Card
      style={{
        marginBottom: "1rem",
      }}
    >
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
        sx={{ backgroundColor: currentThemePalette.cardSecondary }}
      >
        {!isLoading && communityListData && (
          <>
            <Grid
              container
              spacing={3}
              className="community-list"
              style={{
                color: "#FFFFFF",
              }}
            >
              {(communityListData || []).map((community) => (
                <CommunityCard
                  key={community.community_id}
                  id={community.community_id}
                  image={community.icon}
                  description={community.community_description}
                  name={community.community_name}
                  manager={community.manager_full_name}
                  chartData={[
                    {
                      name: "percentage",
                      value: community.percentage,
                      fill: `${
                        currentTheme === "dark"
                          ? "#0a7578"
                          : currentThemePalette.dark
                      }`,
                    },
                    {
                      name: "max",
                      value: 100 - community.percentage,
                      fill: `${
                        currentTheme === "dark"
                          ? "rgba(250, 250, 250, .07)"
                          : "#b6bbc2"
                      }`,
                    },
                  ]}
                  percentage={community.percentage}
                  members={community.members}
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
                {(isAuthenticated && !isMember) && (<PlusIconButton
                  title="Go to input community"
                  ariaLabel="Add community"
                  onClickCallback={() => navigator("/communities/add")}
                  style={{
                    height: "5rem",
                    width: "5rem",
                  }}
                />)}
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityList;
