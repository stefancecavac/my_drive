import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage } from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { UseAuthContext } from "./context/AuthContext";

function App() {
  const { user, userLoading } = UseAuthContext();

  if (userLoading) return null;

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Navigate to={`/${user.rootId}`} />} />
        <Route path="*" element={<Navigate to={`/${user.rootId}`} />} />
        <Route
          path={`/:folderId`}
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
