type TaskCardProps = { title: string };

export default function TaskCard({ title }: TaskCardProps) {
  return (
    <div className="p-3 bg-white rounded-xl shadow mb-2 cursor-pointer hover:bg-gray-100">
      {title}
    </div>
  );
}
