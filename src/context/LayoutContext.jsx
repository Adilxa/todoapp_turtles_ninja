import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isAsideVisible, setIsAsideVisible] = useState(true);

    const toggleAside = () => {
        setIsAsideVisible(prev => !prev);
    };

    return (
        <LayoutContext.Provider value={{ isAsideVisible, toggleAside }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);