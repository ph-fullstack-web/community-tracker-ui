import { lazy } from "react";

const Communities = lazy(() => import("../features/communities"));
const routes = [
  {
    path: "/communities",
    element: <Communities />,
    name: "communities",
  },
];

export default routes;
