import React, { useState } from 'react';
import { useAssignments } from '../../hooks/useAssignments';

const AssignmentForm = ({ assignment, onSubmit }) => {
    const { createAssignment, updateAssignment } = useAssignments();
    const [title, setTitle] = useState(assignment ? assignment.title : '');
    const [description, setDescription] = useState(assignment ? assignment.description : '');
    const [dueDate, setDueDate] = useState(assignment ? assignment.dueDate : '');
    const [classId, setClassId] = useState(assignment ? assignment.classId : '');
    const [subjectId, setSubjectId] = useState(assignment ? assignment.subjectId : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const assignmentData = { title, description, dueDate, classId, subjectId };
        if (assignment) {
            updateAssignment(assignment.id, assignmentData);
        } else {
            createAssignment(assignmentData);
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Titre</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date d'échéance</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Classe</label>
                <select value={classId} onChange={(e) => setClassId(e.target.value)} required>
                    {/* Options for classes should be populated here */}
                </select>
            </div>
            <div>
                <label>Matière</label>
                <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} required>
                    {/* Options for subjects should be populated here */}
                </select>
            </div>
            <button type="submit">{assignment ? 'Mettre à jour' : 'Créer'}</button>
        </form>
    );
};

export default AssignmentForm;