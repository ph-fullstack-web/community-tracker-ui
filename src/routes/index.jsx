import {Routes as ReactRoutes, Route, Navigate} from 'react-router-dom';
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
  InviteManager,
  Maintenance,
  Login,
} from 'pages';
import {useAuthContext} from 'contexts/auth/AuthContext';
import {useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import {GetAccessToken} from '../utils';

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
    ],
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
    ],
  },
  {
    path: 'skills',
    element: <GetSkills />,
    name: 'Get Skills',
  },
  {
    path: 'invite',
    element: <InviteManager />,
    name: 'Invite Manager',
  },
  {
    path: 'maintenance',
    element: <Maintenance />,
    name: 'Maintenance',
  },
  {
    path: 'login',
    element: <Navigate to="/communities" />,
    name: 'Communities',
  },
  {
    path: '*',
    element: <NotFound />,
    name: 'Not Found',
  },
];

export const guestRoutes = [
  {
    path: 'login',
    element: <Login />,
    name: 'Login',
  },
  {
    path: '*',
    element: <Navigate to="/login" />,
    name: 'Login',
  },
];

export const Routes = () => {
  const {
    state: {isAuthenticated},
    dispatch: authDispatch,
  } = useAuthContext();

  const token = GetAccessToken();

  useEffect(() => {
    if (token) {
      const exp = jwtDecode(token)?.exp;
      if (!exp || (exp && new Date().getTime() > new Date(exp * 1000))) {
        authDispatch({type: 'LOGOUT'});
      }
    }
    // eslint-disable-next-line
  }, [token]);

  const getRoutes = list => {
    return (
      <>
        {list.map(({element: Element, name, path, children}) =>
          children ? (
            <Route key={name} path={path}>
              <Route key={name + '-index'} index element={Element} />
              {children.map(
                ({element: ChElement, name: chName, path: chPath}) => (
                  <Route key={chName} path={chPath} element={ChElement} />
                )
              )}
            </Route>
          ) : (
            <Route key={name} path={path} element={Element} />
          )
        )}
      </>
    );
  };

  return (
    <ReactRoutes>
      <Route
        index
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/communities" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {getRoutes(isAuthenticated ? authRoutes : guestRoutes)}
    </ReactRoutes>
  );
};

export default Routes;
