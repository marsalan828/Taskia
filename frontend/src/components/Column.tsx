import TaskCard from "./TaskCard";

type ColumnProps = {
  title: string;
  tasks: { id: string; title: string }[];
};

export default function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="w-1/3 bg-gray-100 rounded-xl p-4">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} title={task.title} />
      ))}
    </div>
  );
}
