import React, { useEffect, useState } from 'react';
import { getSchools } from '../../api/schools';

const SchoolsList = () => {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const data = await getSchools();
                setSchools(data);
            } catch (error) {
                console.error("Error fetching schools:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchools();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Liste des Établissements</h2>
            <ul>
                {schools.map((school) => (
                    <li key={school.id}>
                        {school.name} ({school.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SchoolsList;