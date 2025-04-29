import React, { createContext, useState, useContext, useEffect } from 'react';
import $api from "../../api/http.js";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [notCompletedTasks, setNotCompletedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const allTasksRes = await $api.get("/api/tasks");
            setTasks(allTasksRes.data);
            
            const notCompletedRes = await $api.get("/api/tasks/not-completed");
            setNotCompletedTasks(notCompletedRes.data);
            
            const completedRes = await $api.get("/api/tasks/completed");
            setCompletedTasks(completedRes.data);
            
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setIsLoading(false);
        }
    };

    const createTask = async (taskData) => {
        try {
            await $api.post("/api/tasks", taskData);
            await fetchTasks();
            return true;
        } catch (error) {
            console.error("Error creating task:", error);
            return false;
        }
    };

    const updateTask = async (id, taskData) => {
        try {
            await $api.patch(`/api/tasks/${id}`, taskData);
            await fetchTasks();
            return true;
        } catch (error) {
            console.error("Error updating task:", error);
            return false;
        }
    };

    const deleteTask = async (id) => {
        try {
            await $api.delete(`api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const onSetStatus = async (id) => {
        try {
            await $api.patch(`/api/tasks/${id}/status`);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{
            tasks,
            notCompletedTasks,
            completedTasks,
            isLoading,
            deleteTask,
            onSetStatus,
            fetchTasks,
            createTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('TaskProvider');
    }
    return context;
}; 