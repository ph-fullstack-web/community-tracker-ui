
import PageContainer from 'layout/PageContainer';
import CommunityList from 'components/community/CommunityList';
import {
  Typography
} from "@mui/material";
import { useSwitchThemeContext } from "hooks";

const Communities = () => {
  const { currentTheme, currentThemePalette } = useSwitchThemeContext();
  return (
    <PageContainer>
      <Typography
        component="label"
        sx={{
          padding: "0.25em",
          fontWeight: "700",
          display: "block",
          fontSize: "35px",
          paddingBottom: "25px !important",
          color:
            currentTheme === "dark" ? "#FFFFFF" : "#242323",
        }}
      >
        Communities
      </Typography>
      <CommunityList />
    </PageContainer>
  );
};

export default Communities;
