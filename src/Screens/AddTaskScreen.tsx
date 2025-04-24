import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/AddTask.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Task {
    id: number;
    text: string;
}

export const AddTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editingTask = location.state as Task | undefined;

    const [addTask, setAddtask] = useState("");

    useEffect(() => {
        if (editingTask) {
            setAddtask(editingTask.text);
        }
    }, [editingTask]);

    const handleSave = () => {
        if (!addTask.trim()) {
            toast.error("Please enter a task");
            return;
        }

        const existing = localStorage.getItem("tasks");
        const tasks: Task[] = existing ? JSON.parse(existing) : [];

        let updatedTasks: Task[];

        if (editingTask) {
            updatedTasks = tasks.map((task) =>
                task.id === editingTask.id ? { ...task, text: addTask.trim() } : task
            );
            toast.success("Task updated successfully!");
        } else {
            const newTask: Task = {
                id: Date.now(),
                text: addTask.trim()
            };
            updatedTasks = [...tasks, newTask];
            toast.success("Task added successfully!");
        }

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        navigate('/tasks');
    };

    return (
        <div className="add-task-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="header">
                <h2 className="title">{editingTask ? "Edit Task" : "Add New Task"}</h2>
            </div>

            <input
                type="text"
                placeholder="Add task here..."
                value={addTask}
                onChange={(e) => setAddtask(e.target.value)}
                className="input"
            />

            <button onClick={handleSave} className="add-btn">
                {editingTask ? "Update Task" : "Add Task"}
            </button>
        </div>
    );
};
