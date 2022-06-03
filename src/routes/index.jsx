import { AddCommunity, UpdateCommunity } from 'features';
import { lazy } from 'react';

/* TODO:
    1. Please follow lazy import instead of the traditional way of importing the components.
*/
const Communities = lazy(() => import('../features/communities'));
const Members = lazy(() => import('../features/members'));

const routes = [
  {
    path: '/communities',
    element: <Communities />,
    name: 'communities',
  },
  {
    path: '/members',
    element: <Members />,
    name: 'members',
  },
  {
    path: 'communities/update/:id',
    element: <UpdateCommunity />,
    name: 'updatecommunity',
  },
  {
    path: 'communities/add',
    element: <AddCommunity />,
    name: 'addcommunity',
  },
];

export default routes;