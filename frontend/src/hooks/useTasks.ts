import { useEffect, useState } from "react";
import type { Task } from "../types/task"

export type TaskState = {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
};

const defaultTasks: TaskState = {
  todo: [],
  inprogress: [],
  done: [],
};

export function useTasks() {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (column: keyof TaskState, title: string) => {
    const newTask: Task = { id: Date.now().toString(), title };
    setTasks((prev) => ({
      ...prev,
      [column]: [...prev[column], newTask],
    }));
  };

  const removeTask = (column: keyof TaskState, id: string) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].filter((task) => task.id !== id),
    }));
  };

  const editTask = (column: keyof TaskState, id: string, title: string) => {
    setTasks((prev) => ({
      ...prev,
      [column]: prev[column].map((task) =>
        task.id === id ? { ...task, title } : task
      ),
    }));
  };

  return { tasks, addTask, removeTask, editTask };
}