import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Navbar from "../components/navbar";

const ProtectedLayout = () => {
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

  if (!user) {
    toast.error("You are not logged in! Please login first.");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
