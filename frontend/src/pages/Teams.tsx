import { useState } from "react";
import CreateTeamModal from "../components/CreateTeamModal";

const Teams = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
      <main className="flex justify-center mt-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-xl shadow-md hover:bg-indigo-100 transition"
        >
          + Create a Team
        </button>

        <CreateTeamModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    );
}

export default Teams;