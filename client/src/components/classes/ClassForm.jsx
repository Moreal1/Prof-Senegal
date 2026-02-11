import React, { useState } from 'react';
import { useSchools } from '../../hooks/useSchools';

const ClassForm = ({ onSubmit, initialData }) => {
    const { schools } = useSchools();
    const [className, setClassName] = useState(initialData ? initialData.name : '');
    const [selectedSchool, setSelectedSchool] = useState(initialData ? initialData.schoolId : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const classData = {
            name: className,
            schoolId: selectedSchool,
        };
        onSubmit(classData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="className">Nom de la classe:</label>
                <input
                    type="text"
                    id="className"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="school">Établissement:</label>
                <select
                    id="school"
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un établissement</option>
                    {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                            {school.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Enregistrer</button>
        </form>
    );
};

export default ClassForm;