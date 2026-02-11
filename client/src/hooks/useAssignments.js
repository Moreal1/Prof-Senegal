import { useState, useEffect } from 'react';
import { getAssignments, createAssignment, updateAssignment, deleteAssignment } from '../api/assignments';

const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const data = await getAssignments();
                setAssignments(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAssignments();
    }, []);

    const addAssignment = async (assignment) => {
        try {
            const newAssignment = await createAssignment(assignment);
            setAssignments((prev) => [...prev, newAssignment]);
        } catch (err) {
            setError(err);
        }
    };

    const editAssignment = async (id, updatedAssignment) => {
        try {
            const updated = await updateAssignment(id, updatedAssignment);
            setAssignments((prev) =>
                prev.map((assignment) => (assignment.id === id ? updated : assignment))
            );
        } catch (err) {
            setError(err);
        }
    };

    const removeAssignment = async (id) => {
        try {
            await deleteAssignment(id);
            setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
        } catch (err) {
            setError(err);
        }
    };

    return {
        assignments,
        loading,
        error,
        addAssignment,
        editAssignment,
        removeAssignment,
    };
};

export default useAssignments;