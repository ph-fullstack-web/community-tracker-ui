import Communities from "features/Communities";

const routes = [
    {
        path: '/communities',
        element: <Communities/>,
        exact: true,
        name: 'communities'
    }
];

export default routes;