import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:folderId"
          element={
            <Layout>
              <HomePage></HomePage>
            </Layout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
