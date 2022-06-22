import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { SwitchThemeContextProvider } from 'contexts/theme/SwitchThemeContext';
import { AuthProvider } from 'contexts/auth/AuthContext';
import { NotificationProvider } from 'contexts/notification/NotificationContext';
import { Communities } from 'features';
import routes from 'routes';


function App() {
  const queryClient = new QueryClient();
  return (
    <SwitchThemeContextProvider>
      <AuthProvider>
        <NotificationProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route index path="/" element={<Communities />} />
                {routes.map(({ element: Element, name, path }) => (
                  <Route key={name} path={path} element={Element} />
                ))}
              </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </NotificationProvider>
      </AuthProvider>
    </SwitchThemeContextProvider>
  );
}

export default App;
