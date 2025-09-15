import React from "react";
import { auth } from "../firebase";

type Team = {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: any;
};

type TeamCardProps = {
  team: Team;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
};

const TeamCard: React.FC<TeamCardProps> = ({
  team,
  onDelete,
  onView,
}) => {
  const currentUser = auth.currentUser?.uid;
  const isMember = team?.members?.includes(currentUser ?? "")

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow hover:shadow-md transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{team.name}</h3>
        <p className="text-sm text-gray-500">{team.description}</p>
        <p className="text-xs text-gray-400 mt-1">
          {team.members.length} members
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onDelete(team.id)}
          disabled={isMember && team.createdBy !== currentUser}
          className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:bg-gray-100 disabled:text-gray-400 
             disabled:cursor-not-allowed disabled:hover:bg-gray-100s"
        >
          Delete
        </button>
        <button
          onClick={() => onView(team.id)}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default TeamCard;
