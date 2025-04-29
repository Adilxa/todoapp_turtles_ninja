import React, { useEffect, useRef, useState } from 'react';
import style from "../styles/Modal.module.css";
import CustomButton from '../components/CustomButton.jsx/CustomButton';
import Input from "../components/Input/Input";
import { useTasks } from '../context/TaskContext';
import { Temporal } from '@js-temporal/polyfill';

import i1 from "../image/Inputs/i1.svg";
import i2 from "../image/Inputs/i2.svg";
import i3 from "../image/Inputs/i3.svg";
import icCompl from "../image/Modal/icCompl.svg";
import icDel from "../image/Modal/icDel.svg";

const Modal = ({ onClose, description, title, id, dueDate, startDate }) => {
    const modalRef = useRef();
    const { updateTask, onSetStatus, deleteTask } = useTasks();
            
    const formatDateForDisplay = (isoDate) => {
        if (!isoDate) return "";
        try {
            const [datePart] = isoDate.split('T');
            const [year, month, day] = datePart.split('-').map(Number);
            const date = Temporal.PlainDate.from({ year, month, day });
            return `${String(date.day).padStart(2, '0')}-${String(date.month).padStart(2, '0')}-${date.year}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return "";
        }
    };

    const parseDateToISO = (dateStr) => {
        if (!dateStr) return null;
        try {
            const [day, month, year] = dateStr.split('-').map(Number);
            const date = Temporal.PlainDate.from({ year, month, day });
            return `${date.toString()}T00:00:00.000Z`;
        } catch (error) {
            console.error('Error parsing date:', error);
            return null;
        }
    };

    const [titlee, setTitle] = useState(title);
    const [descriptionn, setDescription] = useState(description);
    const [dueDatee, setDueDate] = useState(formatDateForDisplay(dueDate));
    const [startDatee, setStartDate] = useState(formatDateForDisplay(startDate));

    useEffect(() => {
        setTitle(title);
        setDescription(description);
        setDueDate(formatDateForDisplay(dueDate));
        setStartDate(formatDateForDisplay(startDate));
    }, [title, description, dueDate, startDate]);

    const onEditTask = async (id) => {
        try {
            const formattedDueDate = parseDateToISO(dueDatee);
            const formattedStartDate = parseDateToISO(startDatee);

            const success = await updateTask(id, {
                title: titlee,
                description: descriptionn,
                dueDate: formattedDueDate,
                startDate: formattedStartDate
            });
            
            if (success) {
                onClose();
            } else {
                alert("Произошла ошибка при обновлении задачи");
            }
        } catch (e) {
            console.log(e);
            alert("Произошла ошибка при обновлении задачи");
        }
    }

    const handleDelete = async () => {
        await deleteTask(id);
        onClose();
    };

    const handleComplete = async () => {
        await onSetStatus(id);
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); 
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className={style.All}>
            <div className={style.form} ref={modalRef}>
                <Input value={titlee} onChange={(e) => setTitle((e.target.value))} label="Task Title"
                    placeholder="Task Title" iconSrc={i1}/>
                 <Input 
                    label="Start date" 
                    placeholder="DD-MM-YYYY" 
                    iconSrc={i2}
                    value={startDatee}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                 <Input 
                    label="End date" 
                    placeholder="DD-MM-YYYY" 
                    iconSrc={i2}
                    value={dueDatee}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                 <Input label="Priority level" placeholder="Important" iconSrc={i3}/>

                <div className={style.textareaContainer}>
                    <label className={style.textareaLabel}>Task description</label>
                    <textarea
                        value={descriptionn}
                        onChange={(e) => setDescription((e.target.value))}
                        className={style.textarea}
                        placeholder="Write important notes"
                    ></textarea>
                </div>

                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => onEditTask(id)}>Confirm edit</button>
                </div>
                <div className={style.buttonContainer2}>
                    <CustomButton 
                        style={{ background: "#006D77", color: "white", padding: "3% 10%" }} 
                        text="Mark as completed"
                        icon={icCompl}
                        onClick={handleComplete}
                    />
                    <CustomButton 
                        text="Delete the task" 
                        style={{ padding: "3% 10%" }} 
                        icon={icDel}
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;