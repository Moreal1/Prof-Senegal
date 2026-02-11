import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [schools, setSchools] = useState([]);
    const [classes, setClasses] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [documents, setDocuments] = useState([]);

    return (
        <AppContext.Provider value={{
            schools, setSchools,
            classes, setClasses,
            schedules, setSchedules,
            assignments, setAssignments,
            documents, setDocuments
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};