/**
 * @fileoverview Компонент счетчика с полной документацией JSDoc
 * @author Ваше Имя
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Компонент счетчика, позволяющий увеличивать и уменьшать значение
 *
 * @component
 * @example
 * const initialCount = 0
 * const maxValue = 10
 * return (
 *   <Counter
 *     initialCount={initialCount}
 *     maxValue={maxValue}
 *     label="Товары"
 *   />
 * )
 */
function Counter({ initialCount, maxValue, label }) {
    /**
     * Хук состояния для текущего значения счетчика
     * @type {Array}
     * @property {number} 0 - Текущее значение счетчика
     * @property {Function} 1 - Функция для обновления счетчика
     */
    const [count, setCount] = useState(initialCount);

    /**
     * Увеличивает счетчик на 1, не превышая максимальное значение
     * @returns {void}
     */
    const increment = () => {
        if (count < maxValue) {
            setCount(prevCount => prevCount + 1);
        }
    };

    /**
     * Уменьшает счетчик на 1, останавливаясь на 0
     * @returns {void}
     */
    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    /**
     * Сбрасывает счетчик до начального значения
     * @returns {void}
     */
    const reset = () => {
        setCount(initialCount);
    };

    return (
        <div className="counter">
            <h2>{label}: {count}</h2>
            <div className="counter-controls">
                <button onClick={decrement} disabled={count === 0}>-</button>
                <button onClick={reset}>Сброс</button>
                <button onClick={increment} disabled={count === maxValue}>+</button>
            </div>
            <p>Максимальное значение: {maxValue}</p>
        </div>
    );
}

// Документация PropTypes
Counter.propTypes = {
    /**
     * Начальное значение счетчика
     * @type {number}
     * @default 0
     */
    initialCount: PropTypes.number,

    /**
     * Максимальное значение, которого может достичь счетчик
     * @type {number}
     * @default 100
     */
    maxValue: PropTypes.number,

    /**
     * Метка для отображения рядом со счетчиком
     * @type {string}
     * @default "Счетчик"
     */
    label: PropTypes.string
};

// Значения по умолчанию
Counter.defaultProps = {
    initialCount: 0,
    maxValue: 100,
    label: "Счетчик"
};

export default Counter;