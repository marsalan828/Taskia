import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Board from "./pages/boardPage";
import Login from "./pages/auth/loginPage";
import Register from "./pages/auth/registerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
