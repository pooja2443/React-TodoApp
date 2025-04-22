import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/TaskList.css";

interface Task {
    id: number;
    text: string;
}

export const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task => 
                task.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTasks(filtered);
        }
    }, [searchTerm, tasks]);

    const handleDeleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleNavigateToAddTask = () => {
        navigate('/add');
    };

    const handleEditTask = (task: Task) => {
        navigate('/add', { state: task });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="continer">
            <h1 className="header">Hey, Welcome back</h1>
            
            <div className="searchContainer">
                <FiSearch className="searchIcon" />
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="searchInput"
                />
            </div>
            
            {filteredTasks.length === 0 ? (
                <p className="noTasksMessage">
                    {tasks.length === 0 ? "No tasks added yet." : "No matching tasks found."}
                </p>
            ) : (
                <div className="taskList">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="taskItem">
                            <span className="taskText">{task.text}</span>
                            <div className="actionGroup">
                                <button className="iconButton" onClick={() => handleDeleteTask(task.id)}>
                                    <FiTrash2 />
                                </button>
                                <button className="iconButton" onClick={() => handleEditTask(task)}>
                                    <FiEdit />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <button onClick={handleNavigateToAddTask} className="addButton">Add Tasks</button>
        </div>
    );
};