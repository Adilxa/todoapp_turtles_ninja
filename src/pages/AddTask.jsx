import React, { useState } from 'react';
import style from "../styles/AddTask.module.css";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import Input from "../components/Input/Input"
import { useTasks } from '../context/TaskContext';
import { Temporal } from '@js-temporal/polyfill';

import i1 from "../image/Inputs/i1.svg"
import i2 from "../image/Inputs/i2.svg"
import i3 from "../image/Inputs/i3.svg"

const AddTask = () => {
    const { createTask } = useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const parseDateToISO = (dateStr) => {
        if (!dateStr) return null;
        try {
            const [day, month, year] = dateStr.split('-').map(Number);
            const date = Temporal.PlainDate.from({ year, month, day });
            return `${date.toString()}T12:00:00.000Z`;
        } catch (error) {
            console.error('Error parsing date:', error);
            return null;
        }
    };

    const createNewTask = async () => {
        try {
            const formattedDueDate = parseDateToISO(dueDate);

            const success = await createTask({
                title: title,
                description: description,
                dueDate: formattedDueDate
            });

            if (success) {
                alert("Задача успешно добавлена!");
                setTitle("");
                setDescription("");
                setDueDate("");
            } else {
                alert("Произошла ошибка при добавлении задачи");
            }
        } catch (e) {
            console.log(e);
            alert("Произошла ошибка при добавлении задачи");
        }
    }

    return (
        <>
            <div className={style.All}>
                <div className={style.DivAll}>
                    Create your task
                </div>

                <div className={style.form}>
                    <Input
                        label="Task Title"
                        placeholder="Task Title"
                        iconSrc={i1}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                        label="End date"
                        placeholder="DD-MM-YYYY"
                        iconSrc={i2}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <Input
                        label="Priority level"
                        placeholder="Important"
                        iconSrc={i3}
                    />

                    <div className={style.textareaContainer}>
                        <label className={style.textareaLabel}>Description</label>
                        <textarea
                            className={style.textarea}
                            placeholder="Write important notes"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className={style.buttonContainer}>
                        <button onClick={createNewTask} className={style.button}>Add to list</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTask;