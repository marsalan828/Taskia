import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedLayout from "./protectedLayout";
import { Toaster } from "react-hot-toast";
import MyProfilePage from "./pages/MyProfilePage";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/board" element={<Board />} />
            <Route path="/myProfile" element={<MyProfilePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
