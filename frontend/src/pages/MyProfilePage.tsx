import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";

const MyProfilePage = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setDisplayName(currentUser.displayName || "No Name");
      setEmail(currentUser.email || "No Email");
      setPhotoURL(currentUser.photoURL);
    } else {
      toast.error("No user logged in");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          My Profile
        </h2>

        {photoURL ? (
          <img
            src={photoURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-400"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl">
            {displayName.charAt(0)}
          </div>
        )}

        <div className="space-y-2 text-center">
          <p className="text-lg font-semibold text-gray-700">{displayName}</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
