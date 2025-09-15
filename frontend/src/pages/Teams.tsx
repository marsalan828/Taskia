import { useEffect, useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

type Team = {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: any;
};

const Teams = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser?.uid;
    if (!currentUser) return;

    const q = query(
      collection(db, "teams"),
      where("createdBy", "==", currentUser)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const teamsList: Team[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Team, "id">),
      }));
      setTeams(teamsList);
      setTeamsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="flex flex-col justify-center mt-2">
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 my-2 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-indigo-100 transition"
        >
          + Create a Team
        </button>
      </div>

      <div className="w-full space-y-3">
        {teamsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse flex justify-between items-center p-4 bg-gray-100 rounded-xl"
              >
                <div>
                  <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 w-48 bg-gray-200 rounded mb-1"></div>
                  <div className="h-2 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-12 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : teams.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
              <div className="w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full shadow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-6a2 2 0 012-2h6M9 17H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v2M9 17l-2 2m0 0l-2-2m2 2V9"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                No Teams Yet
              </h2>
            </div>
          </>
        ) : (
          <div className="w-full space-y-3">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {team.name}
                  </h3>
                  <p className="text-sm text-gray-500">{team.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {team.members.length} members
                  </p>
                </div>

                <button className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
};

export default Teams;
