import React from 'react';
import { useParams } from 'react-router-dom';
import { useClasses } from '../../hooks/useClasses';

const ClassDetail = () => {
    const { classId } = useParams();
    const { classDetail, loading, error } = useClasses(classId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading class details.</div>;

    return (
        <div>
            <h1>{classDetail.name}</h1>
            <p><strong>Type:</strong> {classDetail.type}</p>
            <p><strong>Number of Students:</strong> {classDetail.studentCount}</p>
            <p><strong>Description:</strong> {classDetail.description}</p>
            <h2>Subjects</h2>
            <ul>
                {classDetail.subjects.map(subject => (
                    <li key={subject.id}>{subject.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ClassDetail;