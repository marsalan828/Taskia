import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { X } from "lucide-react";

interface User {
  id: number;
  name: string;
}

interface MembersSelectProps {
  users: User[];
  values: { members: number[] };
  setFieldValue: (field: string, value: any) => void;
}

const MembersSelect = ({
  users,
  values,
  setFieldValue,
}: MembersSelectProps) => {
  const [query, setQuery] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      !values.members.includes(u.id) &&
      u.name.toLowerCase().includes(query.toLowerCase())
  );

  const selectedUsers = users.filter((u) => values.members.includes(u.id));

  const handleSelect = (userId: number) => {
    setFieldValue("members", [...values.members, userId]);
    setQuery("");
  };

  const handleRemove = (userId: number) => {
    setFieldValue(
      "members",
      values.members.filter((id) => id !== userId)
    );
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Members</label>

      <div className="flex flex-wrap gap-2 mb-2">
        {selectedUsers.map((user) => (
          <span
            key={user.id}
            className="flex items-center space-x-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            <span>{user.name}</span>
            <button
              type="button"
              onClick={() => handleRemove(user.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <Field
          type="text"
          name="search"
          placeholder="Type to search users..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {query && filteredUsers.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-xl mt-1 max-h-40 overflow-y-auto shadow-lg">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleSelect(user.id)}
                className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ErrorMessage
        name="members"
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default MembersSelect;
