import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Construction from "@mui/icons-material/Construction";
import { ThemeSwitchButton } from "components";
const DRAWER_ROUTES = [
  {
    name: "Communities",
    path: "/communities",
    icon: <PeopleIcon />,
  },
  {
    name: "Add Community",
    path: "/communities/add",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Members",
    path: "/communities",
    icon: <PeopleIcon />,
  },
  {
    name: "Add Member",
    path: "/communities/add",
    icon: <AccountCircleIcon />,
  },
  {
    name: "Report",
    path: "/communities/add",
    icon: <SummarizeIcon />,
  },
  {
    name: "Themes",
    path: "",
    icon: <ThemeSwitchButton />,
  },
  {
    name: "Invite an Admin",
    path: "/invite",
    icon: <PeopleIcon />,
  },
  {
    name: "Maintenance",
    path: "/maintenance",
    icon: <Construction />,
  },
  {
    name: "Change Password",
    icon: <Construction />,
  }
];
export default DRAWER_ROUTES;
