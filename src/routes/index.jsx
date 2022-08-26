import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { 
  AddCommunity, 
  UpdateCommunity, 
  CreateResource, 
  UpdateResource, 
  GetCommunity, 
  Communities, 
  Members, 
  GetSkills, 
  NotFound, 
  InviteAdmin,
  Maintenance,
} from 'pages';
import { useAuthContext } from 'contexts/auth/AuthContext';

const authRoutes = [
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
    path: 'invite',
    element: <InviteAdmin />,
    name: 'Invite Admin',
  },
  {
    path: 'maintenance',
    element: <Maintenance />,
    name: 'Maintenance'
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found'
  },
];

export const guestRoutes = [
  {
    path: 'communities',
    element: <Communities />,
    name: 'Communities',
    children: [
      {
        path: ':id',
        element: <GetCommunity />,
        name: 'Get Community',
      },
      {
        path: 'add',
        element: <NotFound />,
        name: 'Not Found'
      },
    ]
  },
  {
    path: 'members/:communityId',
    element: <Members />,
    name: 'Resources',
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

export const Routes = () => {
  const {state: {isAuthenticated}} = useAuthContext();

  const getRoutes = (list) => {
    return (
      <>
        {list.map(({ element: Element, name, path, children }) =>
          children ? (
            <Route key={name} path={path}>
              <Route key={name + "-index"} index element={Element} />
              {children.map(
                ({ element: ChElement, name: chName, path: chPath }) => (
                  <Route key={chName} path={chPath} element={ChElement} />
                )
              )}
            </Route>
          ) : (
            <Route key={name} path={path} element={Element} />
          )
        )}
      </>
    )
  };

  return (
    <ReactRoutes>
      <Route index path="/" element={<Communities />} />
        {getRoutes(isAuthenticated ? authRoutes : guestRoutes)}
    </ReactRoutes>
  )
};

export default Routes;
