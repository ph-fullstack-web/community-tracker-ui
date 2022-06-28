import { AddCommunity, UpdateCommunity, CreateResource, UpdateResource, GetCommunity, Communities, Members, GetSkills } from 'pages';

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
    name: 'Members',
  },
  {
    path: 'members/create',
    element: <CreateResource />,
    name: 'Create Resource',
  },
  {
    path: 'members/update/:peopleId',
    element: <UpdateResource />,
    name: 'Update Resource',
  },
  {
    path: 'skills',
    element: <GetSkills />,
    name: 'Get Skills',
  },
];

export default routes;
