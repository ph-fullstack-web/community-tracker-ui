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
    path: "communities/update/:id",
    element: <UpdateCommunity />,
    name: "updatecommunity",    
  },
  {
    path: "communities/add",
    element: <AddCommunity />,
    name: "addcommunity",    
  },
];

export default routes;
