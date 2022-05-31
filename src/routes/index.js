import { AddCommunity , UpdateCommunity} from "features";
import { lazy } from "react";


/* TODO:
    1. Please follow lazy import instead of the traditional way of importing the components.
*/
const Communities = lazy(() => import("../features/communities"));

const routes = [
  {
    path: "/communities",
    element: <Communities />,
    name: "communities",
  },
  {
    path: "/updatecommunity",
    element: <UpdateCommunity />,
    name: "updatecommunity",    
  },
  {
    path: "/addcommunity",
    element: <AddCommunity />,
    name: "addcommunity",    
  },
];

export default routes;
