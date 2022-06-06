import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import routeList from 'routes';
import { ReactQueryDevtools } from 'react-query/devtools';

import { SwitchThemeContextProvider } from 'contexts/Theme/SwitchThemeContext';

function App() {
  const queryClient = new QueryClient();
  return (
    <SwitchThemeContextProvider>
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
    </SwitchThemeContextProvider>
  );
}

export default App;
