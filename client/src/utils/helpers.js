// This file contains helper functions used throughout the application.

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

export const calculateTotalHours = (schedule) => {
    return schedule.reduce((total, entry) => {
        const start = new Date(entry.start);
        const end = new Date(entry.end);
        const hours = (end - start) / (1000 * 60 * 60);
        return total + hours;
    }, 0);
};

export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};