import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./protectedRoutes/protectedLayout";
import { Toaster } from "react-hot-toast";
import MyProfilePage from "./pages/MyProfilePage";
import ProtectedLogin from "./protectedRoutes/protectedLogin";
import Teams from "./pages/Teams";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedLogin />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/board" element={<Board />} />
            <Route path="/myProfile" element={<MyProfilePage />} />
            <Route path="/teams" element={<Teams />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
