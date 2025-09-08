import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import type { Task } from "../types/task";

export type TaskState = {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
};

const defaultTasks: TaskState = {
  todo: [],
  inProgress: [],
  done: [],
};

export function useTasks() {
  const [tasks, setTasks] = useState<TaskState>(defaultTasks);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const allTasks = snapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() } as Task)
      );

      setTasks({
        todo: allTasks.filter((t) => t.status === "todo"),
        inProgress: allTasks.filter((t) => t.status === "inProgress"),
        done: allTasks.filter((t) => t.status === "done"),
      });
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (status: Task["status"], title: string) => {
    await addDoc(collection(db, "tasks"), { title, status });
  };

  const removeTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const editTask = async (id: string, title: string) => {
    await updateDoc(doc(db, "tasks", id), { title });
  };

  return { tasks, addTask, removeTask, editTask };
}
