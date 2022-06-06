import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import CommunityList from 'components/community/CommunityList';

import { Typography } from '@mui/material';
import { useContext } from 'react';
import { SwitchThemeContext } from 'contexts/Theme/SwitchThemeContext';

const Communities = () => {
  const { currentTheme } = useContext(SwitchThemeContext);

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
