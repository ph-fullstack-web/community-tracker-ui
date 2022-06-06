import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import CommunityList from 'components/community/CommunityList';

import { Typography } from '@mui/material';
import useSwitchThemeContext from 'hooks/Theme/useSwitchThemeContext';

const Communities = () => {
  const { currentTheme } = useSwitchThemeContext();

  return (
    <PageContainer>
      <Logo />

      <Typography variant="h5" gutterBottom component="div">
        {currentTheme}
      </Typography>

      <PageTitle title="Community selection page." />

      <CommunityList />
    </PageContainer>
  );
};

export default Communities;
