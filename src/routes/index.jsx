import { AddCommunity, UpdateCommunity, CreateResource, UpdateResource, GetCommunity, Communities, Members } from 'features';

const routes = [
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
    name: 'createresource'
  },
  {
    path: '/resources/:community/update/:peopleId',
    element: <UpdateResource />,
    name: 'updateresource'
  },
  {
    path: '/communities/:id',
    element: <GetCommunity />,
    name: 'getcommunity',
  },
];

export default routes;
