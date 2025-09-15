// components/TeamList.tsx
import React from "react";
import TeamCard from "./TeamCard";
import TeamSkeleton from "./TeamSkeleton";
import TeamEmptyState from "./TeamEmptyState";

type Team = {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdBy: string;
  createdAt: any;
};

type TeamListProps = {
  teams: Team[];
  loading: boolean;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
};

const TeamList: React.FC<TeamListProps> = ({
  teams,
  loading,
  onDelete,
  onView,
}) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <TeamSkeleton key={i} />
        ))}
      </div>
    );
  }

   if (teams.length === 0) {
     return <TeamEmptyState />;
   }

  return (
    <div className="w-full space-y-3">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default TeamList;
