import { BrowserRouter, Routes, Route } from "react-router-dom";
import Communities from "features/Communities";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/communities" element={<Communities/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
