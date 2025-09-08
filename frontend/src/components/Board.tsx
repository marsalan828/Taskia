import Column from "./Column";
import { useTasks } from "../hooks/useTasks";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

export default function Board() {
  const { tasks, addTask, removeTask, editTask, moveTask } = useTasks();

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
    <div className="flex flex-col">
      <div className="self-start text-2xl/7 font-bold text-black sm:truncate sm:text-3xl sm:tracking-tight">
        Taskia
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-4 p-6 h-screen bg-gray-200">
          <Column
            id="todo"
            title="To Do"
            tasks={tasks.todo}
            onAdd={(title) => addTask("todo", title)}
            onRemove={(id) => removeTask(id)}
            onEdit={(id, title) => editTask(id, title)}
          />
          <Column
            id="inProgress"
            title="In Progress"
            tasks={tasks.inProgress}
            onAdd={(title) => addTask("inProgress", title)}
            onRemove={(id) => removeTask(id)}
            onEdit={(id, title) => editTask(id, title)}
          />
          <Column
            id="done"
            title="Done"
            tasks={tasks.done}
            onAdd={(title) => addTask("done", title)}
            onRemove={(id) => removeTask(id)}
            onEdit={(id, title) => editTask(id, title)}
          />
        </div>
      </DragDropContext>
    </div>
  );
}
