import React from 'react';
import Card from "../components/Card/Card"
import style from "../styles/Completed.module.css";
import iconSrc from "../image/Header/iconSrc.svg";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import { useTasks } from '../context/TaskContext';

const RunningTasks = () => {
    const { notCompletedTasks, isLoading, deleteTask, onSetStatus } = useTasks();

    if (isLoading) return <h1>Loading...</h1>

    return (
        <>
            <div className={style.All}>
                <div className={style.DivAll}>
                    Running Tasks
                </div>
                
                <div className={style.AllTop}>
                    <div className={style.inputWrapper}>
                        <input
                            className={style.styledInput}
                            placeholder="Search by name"
                        />
                        <img src={iconSrc} alt="search" className={style.searchIcon} />
                    </div>
                </div>

                <div className={style.Cards}>
                    {notCompletedTasks.map((task) => (
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
                    <CustomButton style={{fontWeight:"700"}} text="Load more" />
                </div>
            </div>
        </>
    );
};  

export default RunningTasks;