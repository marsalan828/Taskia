import { type FC } from "react";

const TeamEmptyState: FC = () => {
  return (
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
      <h2 className="text-lg font-semibold text-gray-800">No Teams Yet</h2>
      <p className="text-sm text-gray-500">
        Create your first team to get started 🚀
      </p>
    </div>
  );
};

export default TeamEmptyState;
