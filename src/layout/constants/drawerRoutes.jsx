import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Construction from '@mui/icons-material/Construction';
import Password from '@mui/icons-material/Password';
import {ThemeSwitchButton} from 'components';

export const DRAWER_ROUTES = [
  {
    name: 'Communities',
    path: '/communities',
    icon: <PeopleIcon />,
  },
  {
    name: 'Add Community',
    path: '/communities/add',
    icon: <AccountCircleIcon />,
  },
  {
    name: 'Members',
    path: '/communities',
    icon: <PeopleIcon />,
  },
  {
    name: 'Report',
    path: '/skills',
    icon: <SummarizeIcon />,
  },
  {
    name: 'Themes',
    path: '',
    icon: <ThemeSwitchButton />,
  },
  {
    name: 'Invite Manager',
    path: '/invite',
    icon: <PeopleIcon />,
  },
  {
    name: 'Maintenance',
    path: '/maintenance',
    icon: <Construction />,
  },
  {
    name: 'Change Password',
    icon: <Password />,
  },
];

export const GUEST_DRAWER_ROUTES = [
  {
    name: 'Communities',
    path: '/communities',
    icon: <PeopleIcon />,
  },
  {
    name: 'Members',
    path: '/communities',
    icon: <PeopleIcon />,
  },
  {
    name: 'Report',
    path: '/skills',
    icon: <SummarizeIcon />,
  },
  {
    name: 'Themes',
    path: '',
    icon: <ThemeSwitchButton />,
  },
];

export default DRAWER_ROUTES;
