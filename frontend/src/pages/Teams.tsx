import { useEffect, useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import TeamList from "../components/TeamList";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

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

  const handleDelete = async () => {
    if (!teamToDelete) return;
    try {
      await deleteDoc(doc(db, "teams", teamToDelete));
      setTeamToDelete(null);
    } catch (error) {
      console.error("Error deleting team:", error);
    } finally {
      setDeleteModalOpen(false);
    }
  };

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

      <TeamList
        teams={teams}
        loading={teamsLoading}
        onDelete={(id) => {
          setTeamToDelete(id);
          setDeleteModalOpen(true);
        }}
        onView={(id) => console.log("View team:", id)}
      />
      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </main>
  );
};

export default Teams;
