import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/AddTask.css";

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
        if (!addTask.trim()) return;

        const existing = localStorage.getItem("tasks");
        const tasks: Task[] = existing ? JSON.parse(existing) : [];

        let updatedTasks: Task[];

        if (editingTask) {
            updatedTasks = tasks.map((task) =>
                task.id === editingTask.id ? { ...task, text: addTask.trim() } : task
            );
        } else {
            const newTask: Task = {
                id: Date.now(),
                text: addTask.trim()
            };
            updatedTasks = [...tasks, newTask];
        }

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        navigate('/tasks');
    };

    return (
        <div className="add-task-container">
            <div className="header">
                {/* <button onClick={() => navigate('/tasks')} className="back-btn">←</button> */}
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
