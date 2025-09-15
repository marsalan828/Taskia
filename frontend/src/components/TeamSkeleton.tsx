import React from "react";

const TeamSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex justify-between items-center p-4 bg-gray-100 rounded-xl">
      <div>
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-48 bg-gray-200 rounded mb-1"></div>
        <div className="h-2 w-20 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 w-12 bg-gray-300 rounded"></div>
    </div>
  );
};

export default TeamSkeleton;
