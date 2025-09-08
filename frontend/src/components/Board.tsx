// src/components/Board.tsx
import Column from "./Column";
import { useTasks } from "../hooks/useTasks";

export default function Board() {
  const { tasks, addTask, removeTask, editTask } = useTasks();

  return (
    <div className="flex gap-4 p-6 h-screen bg-gray-200">
      <Column
        title="To Do"
        tasks={tasks.todo}
        onAdd={(title) => addTask("todo", title)}
        onRemove={(id) => removeTask("todo", id)}
        onEdit={(id, title) => editTask("todo", id, title)}
      />
      <Column
        title="In Progress"
        tasks={tasks.inprogress}
        onAdd={(title) => addTask("inprogress", title)}
        onRemove={(id) => removeTask("inprogress", id)}
        onEdit={(id, title) => editTask("inprogress", id, title)}
      />
      <Column
        title="Done"
        tasks={tasks.done}
        onAdd={(title) => addTask("done", title)}
        onRemove={(id) => removeTask("done", id)}
        onEdit={(id, title) => editTask("done", id, title)}
      />
    </div>
  );
}
