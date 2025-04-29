import React from 'react';
import Card from "../components/Card/Card"
import style from "../styles/Home.module.css";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import Add from '../image/Add.svg'
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { notCompletedTasks, completedTasks, isLoading, deleteTask, onSetStatus } = useTasks();
    const navigate = useNavigate();

    return (
        <>
        <div className={style.homePage}>
            <div className={style.right}>
                <h1 className={style.h1}>Running Tasks</h1>
                
                <div className={style.cards}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        notCompletedTasks.map((task) => (
                            <Card
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                status={task.completed}
                                dueDate={task.dueDate}
                                createdAt={task.createdAt}
                                deleteTask={deleteTask}
                                onSetStatus={onSetStatus}
                            />
                        ))
                    )}
                </div>

                <div className={style.buttonn}>
                    <CustomButton 
                        text="All running Tasks →" 
                        onClick={() => navigate('/runningtasks')}
                    />
                </div>
            </div>

            <div className={style.line}></div>

            <div className={style.left}>
                <h1 className={style.h1}>Completed Tasks</h1>

                <div className={style.cards}>
                    {completedTasks.map((task) => (
                        <Card
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.completed}
                            dueDate={task.dueDate}
                            createdAt={task.createdAt}
                            deleteTask={deleteTask}
                            onSetStatus={onSetStatus}
                        />
                    ))}
                </div>

                <div className={style.buttonn}>
                    <CustomButton 
                        text="All Completed Tasks →" 
                        onClick={() => navigate('/completedtasks')}
                    />
                    <img src={Add} alt="" 
                        style={{cursor: 'pointer'}}
                        onClick={() => navigate('/addTask')} />
                </div>
            </div>
        </div>
        </>
    );
};  

export default HomePage;