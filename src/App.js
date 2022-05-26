import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import routeList from "routes";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {
            routeList.map(({element: Element, name, path, exact}) => (
              <Route key={name} path={path} exact={exact} element={Element} />
            ))
          }
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
