import { useState, useEffect } from 'react';
import { getSchools, addSchool, updateSchool, deleteSchool } from '../api/schools';

const useSchools = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const data = await getSchools();
                setSchools(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    const createSchool = async (schoolData) => {
        try {
            const newSchool = await addSchool(schoolData);
            setSchools((prevSchools) => [...prevSchools, newSchool]);
        } catch (err) {
            setError(err);
        }
    };

    const editSchool = async (id, schoolData) => {
        try {
            const updatedSchool = await updateSchool(id, schoolData);
            setSchools((prevSchools) =>
                prevSchools.map((school) => (school.id === id ? updatedSchool : school))
            );
        } catch (err) {
            setError(err);
        }
    };

    const removeSchool = async (id) => {
        try {
            await deleteSchool(id);
            setSchools((prevSchools) => prevSchools.filter((school) => school.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return { schools, loading, error, createSchool, editSchool, removeSchool };
};

export default useSchools;