import Column from "../components/Column";
import LogOut from "../components/Logout";
import { auth } from "../firebase";
import { useTasks } from "../hooks/useTasks";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export default function Board() {
  const { tasks, addTask, removeTask, editTask, moveTask, isTaskLoading } =
    useTasks();
  const currentUser = auth.currentUser;
  const currentUserId = currentUser?.uid

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(
      draggableId,
      destination.droppableId as "todo" | "inProgress" | "done"
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md rounded-xl">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Taskia
          </h1>
          <p className="mt-2 text-lg text-indigo-100">
            Manage your tasks with style 🚀
          </p>
        </div>
        <LogOut />
      </header>

      {/* Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Column
            id="todo"
            title="To Do"
            tasks={tasks.todo}
            onAdd={(title) => addTask("todo", title, currentUserId)}
            onRemove={(id) => removeTask(id)}
            onEdit={(id, title) => editTask(id, title)}
            isTaskLoading={isTaskLoading}
          />
          <Column
            id="inProgress"
            title="In Progress"
            tasks={tasks.inProgress}
            onAdd={(title) => addTask("inProgress", title, currentUserId)}
            onRemove={(id) => removeTask(id)}
            onEdit={(id, title) => editTask(id, title)}
            isTaskLoading={isTaskLoading}
          />
          <Column
            id="done"
            title="Done"
            tasks={tasks.done}
            onAdd={(title) => addTask("done", title, currentUserId)}
            onRemove={(id) => removeTask(id)}
            onEdit={(id, title) => editTask(id, title)}
            isTaskLoading={isTaskLoading}
          />
        </div>
      </DragDropContext>
    </div>
  );
}
