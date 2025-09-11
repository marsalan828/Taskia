import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import type { Task } from "../types/task";
import { onAuthStateChanged } from "firebase/auth";

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
  const [uid, setUid] = useState<string | null>(null);
  const [isTaskLoading, setIsTaskLoading] = useState<boolean>(true);


  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        setTasks({ todo: [], inProgress: [], done: [] });
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, "tasks"), where("createdBy", "==", uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allTasks = snapshot.docs.map(
        (d) => ({ id: d.id, ...d.data() } as Task)
      );

      setTasks({
        todo: allTasks.filter((t) => t.status === "todo"),
        inProgress: allTasks.filter((t) => t.status === "inProgress"),
        done: allTasks.filter((t) => t.status === "done"),
      });
      setIsTaskLoading(false)
    });

    return () => unsubscribe();
  }, [uid]);

  const addTask = async (
    status: Task["status"],
    title: string,
    createdBy?: string
  ) => {
    await addDoc(collection(db, "tasks"), { title, status, createdBy });
  };

  const removeTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const editTask = async (id: string, title: string) => {
    await updateDoc(doc(db, "tasks", id), { title });
  };

  const moveTask = async (
    taskId: string,
    newStatus: "todo" | "inProgress" | "done"
  ) => {
    const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.done];
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return;

    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { status: newStatus });

    setTasks((prev) => {
      const updated = {
        todo: prev.todo.filter((t) => t.id !== taskId),
        inProgress: prev.inProgress.filter((t) => t.id !== taskId),
        done: prev.done.filter((t) => t.id !== taskId),
      };
      return {
        ...updated,
        [newStatus]: [...updated[newStatus], { ...task, status: newStatus }],
      };
    });
  };

  return { tasks, addTask, removeTask, editTask, moveTask, isTaskLoading };
}
