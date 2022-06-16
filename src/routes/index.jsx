import {
  AddCommunity,
  UpdateCommunity,
  CreateResource,
  UpdateResource,
  GetCommunity,
  GetSkills,
} from 'features';

import { lazy } from 'react';

/* TODO:
    1. Please follow lazy import instead of the traditional way of importing the components.
*/
const Communities = lazy(() => import('../features/communities'));
const Members = lazy(() => import('../features/members'));

const routes = [
  {
    path: '/',
    element: <Communities />,
    name: 'root',
  },
  {
    path: '/communities',
    element: <Communities />,
    name: 'communities',
  },
  {
    path: '/resources/:id',
    element: <Members />,
    name: 'resources',
  },
  {
    path: '/communities/update/:id',
    element: <UpdateCommunity />,
    name: 'updatecommunity',
  },
  {
    path: '/communities/add',
    element: <AddCommunity />,
    name: 'addcommunity',
  },
  {
    path: '/resources/:community/create',
    element: <CreateResource />,
    name: 'createresource',
  },
  {
    path: '/resources/:community/update/:peopleId',
    element: <UpdateResource />,
    name: 'updateresource',
  },
  {
    path: '/communities/:id',
    element: <GetCommunity />,
    name: 'getcommunity',
  },
  {
    path: '/skills',
    element: <GetSkills />,
    name: 'getskills',
  },
];

export default routes;
