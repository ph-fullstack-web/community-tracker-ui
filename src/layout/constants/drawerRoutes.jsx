import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SummarizeIcon from "@mui/icons-material/Summarize";
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
    path: "/communities/add",
    icon: <SummarizeIcon />,
  },
];
export default DRAWER_ROUTES;
