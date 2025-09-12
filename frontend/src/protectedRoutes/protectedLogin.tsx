import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ProtectedLogin = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/board" replace />;
  }

  return <Outlet />;
};

export default ProtectedLogin;
