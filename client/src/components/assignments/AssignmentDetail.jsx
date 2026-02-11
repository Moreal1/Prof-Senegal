import React from 'react';
import { useParams } from 'react-router-dom';
import { useAssignments } from '../../hooks/useAssignments';

const AssignmentDetail = () => {
    const { id } = useParams();
    const { getAssignmentById } = useAssignments();
    const [assignment, setAssignment] = React.useState(null);

    React.useEffect(() => {
        const fetchAssignment = async () => {
            const data = await getAssignmentById(id);
            setAssignment(data);
        };
        fetchAssignment();
    }, [id, getAssignmentById]);

    if (!assignment) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{assignment.title}</h2>
            <p><strong>Class:</strong> {assignment.class}</p>
            <p><strong>Subject:</strong> {assignment.subject}</p>
            <p><strong>Due Date:</strong> {assignment.dueDate}</p>
            <h3>Description</h3>
            <p>{assignment.description}</p>
            <h3>Attachments</h3>
            <ul>
                {assignment.attachments.map((file, index) => (
                    <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AssignmentDetail;