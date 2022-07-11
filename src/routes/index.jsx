import { AddCommunity, UpdateCommunity, CreateResource, UpdateResource, GetCommunity, Communities, Members, GetSkills, NotFound } from 'pages';

const routes = [
  {
    path: 'communities',
    element: <Communities />,
    name: 'Communities',
    children: [
      {
        path: 'update/:id',
        element: <UpdateCommunity />,
        name: 'Update Community',
      },
      {
        path: 'add',
        element: <AddCommunity />,
        name: 'Add Community',
      },
      {
        path: ':id',
        element: <GetCommunity />,
        name: 'Get Community',
      },
    ]
  },
  {
    path: 'members/:communityId',
    element: <Members />,
    name: 'Resources',
    children: [
      {
        path: 'create',
        element: <CreateResource />,
        name: 'Create Resource',
      },
      {
        path: 'update/:peopleId',
        element: <UpdateResource />,
        name: 'Update Resource',
      },
    ]
  },
  {
    path: 'skills',
    element: <GetSkills />,
    name: 'Get Skills',
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found'
  },
];

export default routes;
