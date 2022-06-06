import Logo from 'layout/Logo';
import PageTitle from 'layout/PageTitle';
import PageContainer from 'layout/PageContainer';
import MembersMainContainer from './MembersMainContainer';
import ThemeSwitchButton from 'components/themeSwitcher/ThemeSwitchButton';

import { Stack } from '@mui/material';

const Members = () => {
  return (
    <PageContainer>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Logo /> <ThemeSwitchButton />
      </Stack>
      <PageTitle title="Resource Details Page." />
      <MembersMainContainer />
    </PageContainer>
  );
};

export default Members;
