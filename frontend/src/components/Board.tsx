import Column from "./Column";
import { initialTasks } from "../data/tasks";

export default function Board() {
  return (
    <div className="flex gap-4 p-6 h-screen bg-gray-200">
      <Column title="To Do" tasks={initialTasks.todo} />
      <Column title="In Progress" tasks={initialTasks.inprogress} />
      <Column title="Done" tasks={initialTasks.done} />
    </div>
  );
}
