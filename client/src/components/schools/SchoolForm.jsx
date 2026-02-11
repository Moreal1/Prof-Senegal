import React, { useState } from 'react';
import { useSchools } from '../../hooks/useSchools';

const SchoolForm = ({ school, onSubmit }) => {
    const [name, setName] = useState(school ? school.name : '');
    const [type, setType] = useState(school ? school.type : 'Public');
    const { addSchool, updateSchool } = useSchools();

    const handleSubmit = (e) => {
        e.preventDefault();
        const schoolData = { name, type };

        if (school) {
            updateSchool(school.id, schoolData);
        } else {
            addSchool(schoolData);
        }

        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nom de l'établissement:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="Public">Public</option>
                    <option value="Privé">Privé</option>
                </select>
            </div>
            <button type="submit">{school ? 'Modifier' : 'Ajouter'} l’établissement</button>
        </form>
    );
};

export default SchoolForm;