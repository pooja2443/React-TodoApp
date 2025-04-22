import React from "react";
import { LoginScreen } from "./Screens/LoginScreen";
import { TaskList } from "./Screens/TaskListScreen";
import { Route, Routes } from "react-router-dom";
import { AddTask } from "./Screens/AddTaskScreen";

export const App = () => {
  return(
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/add" element={<AddTask />} />
    </Routes>
  )
}