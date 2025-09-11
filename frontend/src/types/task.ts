export type Task = {
  id: string;
  title: string;
  status: "todo" | "inProgress" | "done";
  createdBy: string;
};
