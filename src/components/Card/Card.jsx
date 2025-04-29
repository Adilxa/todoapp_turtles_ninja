import React, { useState } from 'react';
import style from "../../styles/Card.module.css";
import mark from "../../image/Card/mark.svg";
import completed from "../../image/Card/completed.svg";
import i1 from "../../image/Card/1.svg";
import i2 from "../../image/Card/2.svg";
import i3 from "../../image/Card/3.svg";
import Modal from '../../pages/Modal'; 
import { useTasks } from '../../context/TaskContext';
import { Temporal } from '@js-temporal/polyfill';

const Card = ({title, description, id, status, dueDate, createdAt}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { onSetStatus, deleteTask } = useTasks();

    const onCloseModal = () => {
        setIsModalOpen(false);
    }
    
    const formatDate = (isoDate) => {
        if (!isoDate) return "Не установлена";
        try {
            if (isoDate.includes('T')) {
                const [datePart] = isoDate.split('T');
                const [year, month, day] = datePart.split('-').map(Number);
                const date = Temporal.PlainDate.from({ year, month, day });
                const result = `${String(date.day).padStart(2, '0')}-${String(date.month).padStart(2, '0')}-${date.year}`;
                return result;
            }
            const date = Temporal.Instant.from(isoDate).toZonedDateTimeISO('UTC');
            return date.toLocaleString('en-GB', { 
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '-');
        } catch (e) {
            console.error('Error formatting date:', e);
            return "Не установлена";
        }
    };

    return (
        <>
            <div className={style.card}>
                <div className={style.right}>
                    <h1 className={style.Name}>{title}</h1>
                    <p className={style.date}>Start: <span>{formatDate(createdAt)}</span></p>
                    {status && (
                        <p className={style.date}>End: <span>{formatDate(dueDate)}</span></p>
                    )}
                    <p>{description}</p>

                    <div className={style.stateTask} onClick={() => onSetStatus(id)}>
                        {status ? 
                            <div className={style.stateTask}>
                                <img className={style.completed} src={completed} alt="" /> 
                                    <p>completed</p> 
                            </div>
                            : 
                            <div className={style.stateTask}>
                                <img className={style.mark} src={mark} alt="" /> 
                                <p>Mark as completed</p> 
                            </div>
                        }
                    </div>
                </div>

                <div className={style.left}>
                    <img src={i1} alt="" />
                    <img src={i2} alt="" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }} />
                    <img style={{cursor:"pointer"}} onClick={() => deleteTask(id)} src={i3} alt="" />
                </div>
            </div>

            {isModalOpen && 
            <Modal 
                title={title} 
                id={id} 
                description={description} 
                onClose={onCloseModal}
                dueDate={dueDate}
                startDate={createdAt}
            />}
        </>
    );
};

export default Card;