import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import routeList from 'routes';
import { ReactQueryDevtools } from 'react-query/devtools';

import { SwitchThemeContextProvider } from 'contexts/Theme/SwitchThemeContext';
import { AuthProvider } from 'contexts';

function App() {
  const queryClient = new QueryClient();
  return (
    <SwitchThemeContextProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              {routeList.map(({ element: Element, name, path }) => (
                <Route key={name} path={path} element={Element} />
              ))}
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </SwitchThemeContextProvider>
  );
}

export default App;
