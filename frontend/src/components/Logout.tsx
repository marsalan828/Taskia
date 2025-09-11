import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../slices/authSlice";

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser() as any); 
        navigate("/");    
    };
    return (
        <button
          onClick={handleLogout}
          className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition"
        >
          Logout
        </button>
    );
}

export default LogOut;``