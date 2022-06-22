import { AddCommunity, UpdateCommunity, CreateResource, UpdateResource, GetCommunity, Communities, Members, GetSkills } from 'features';

const routes = [
  {
    path: '/communities',
    element: <Communities />,
    name: 'Communities',
  },
  {
    path: '/resources/:id',
    element: <Members />,
    name: 'Resources',
  },
  {
    path: '/communities/update/:id',
    element: <UpdateCommunity />,
    name: 'Update Community',
  },
  {
    path: '/communities/add',
    element: <AddCommunity />,
    name: 'Add Community',
  },
  {
    path: '/resources/:community/create',
    element: <CreateResource />,
    name: 'Create Resource',
  },
  {
    path: '/resources/:community/update/:peopleId',
    element: <UpdateResource />,
    name: 'Update Resource',
  },
  {
    path: '/communities/:id',
    element: <GetCommunity />,
    name: 'Get Community',
  },
  {
    path: '/skills',
    element: <GetSkills />,
    name: 'Get Skills',
  },
];

export default routes;
