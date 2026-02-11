import React from 'react';

const AssignmentFilters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="assignment-filters">
            <h3>Filtrer les Devoirs</h3>
            <label>
                Classe:
                <select name="class" value={filters.class} onChange={handleChange}>
                    <option value="">Toutes les classes</option>
                    <option value="Terminale S1">Terminale S1</option>
                    <option value="Seconde L">Seconde L</option>
                    {/* Ajoutez d'autres classes ici */}
                </select>
            </label>
            <label>
                Matière:
                <select name="subject" value={filters.subject} onChange={handleChange}>
                    <option value="">Toutes les matières</option>
                    <option value="Math">Math</option>
                    <option value="PC">PC</option>
                    <option value="SVT">SVT</option>
                    {/* Ajoutez d'autres matières ici */}
                </select>
            </label>
            <label>
                Statut:
                <select name="status" value={filters.status} onChange={handleChange}>
                    <option value="">Tous les statuts</option>
                    <option value="À corriger">À corriger</option>
                    <option value="Corrigé">Corrigé</option>
                </select>
            </label>
        </div>
    );
};

export default AssignmentFilters;