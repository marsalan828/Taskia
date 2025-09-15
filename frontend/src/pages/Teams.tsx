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
  const [memberTeams, setMemberTeams] = useState<Team[]>([]);

  useEffect(() => {
    const currentUser = auth.currentUser?.uid;
    if (!currentUser) return;

    const q1 = query(
      collection(db, "teams"),
      where("createdBy", "==", currentUser)
    );

    const q2 = query(
      collection(db, "teams"),
      where("members", "array-contains", currentUser)
    );

    const unsubMyTeams = onSnapshot(q1, (snapshot) => {
      const teamsList: Team[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Team, "id">),
      }));
      setTeams(teamsList);
      setTeamsLoading(false);
    });

    const unsubMemberTeams = onSnapshot(q2, (snapshot) => {
      const teamsList: Team[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Team, "id">),
      }));
      setMemberTeams(teamsList);
      setTeamsLoading(false);
    });

    return () => {
      unsubMyTeams();
      unsubMemberTeams();
    };
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
    <main className="flex flex-col justify-center mt-2 p-4">
      <div className="flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 my-2 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-indigo-100 transition"
        >
          + Create a Team
        </button>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Your Teams
        </h2>
        <TeamList
          teams={teams}
          loading={teamsLoading}
          onDelete={(id) => {
            setTeamToDelete(id);
            setDeleteModalOpen(true);
          }}
          onView={(id) => console.log("View team:", id)}
        />
      </section>
      <hr className="my-6 border-gray-300" />
      <section>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Teams You’re a Part Of
        </h2>
        <TeamList
          teams={memberTeams.filter(
            (team) => team.createdBy !== auth.currentUser?.uid
          )}
          loading={teamsLoading}
          onDelete={() => {}}
          onView={(id) => console.log("View team:", id)}
        />
      </section>
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
