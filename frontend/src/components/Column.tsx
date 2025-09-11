import { useState } from "react";
import type { Task } from "../types/task";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { ClipLoader } from "react-spinners";

type Props = {
  id: string;
  title: string;
  tasks: Task[];
  onAdd: (title: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  isTaskLoading: boolean;
};

export default function Column({
  id,
  title,
  tasks,
  onAdd,
  onRemove,
  onEdit,
  isTaskLoading,
}: Props) {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="bg-white p-4 rounded shadow w-1/3">
      <h2 className="text-lg font-bold mb-4">{title}</h2>

      <Droppable droppableId={id}>
        {(provided: any) => (
          <div
            className="space-y-2 min-h-[50px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isTaskLoading ? (
              <div className="flex justify-center items-center">
                <ClipLoader size={50} color="#4A90E2" />
              </div>
            ) : (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="flex justify-between items-center bg-gray-100 p-2 rounded"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{task.title}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => {
                            const updated = prompt("Edit task:", task.title);
                            if (updated) onEdit(task.id, updated);
                          }}
                          className="text-blue-500 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onRemove(task.id)}
                          className="text-red-500 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-4 flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={() => {
            if (!newTask.trim()) return;
            onAdd(newTask);
            setNewTask("");
          }}
          className="ml-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}
