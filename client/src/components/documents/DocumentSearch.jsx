import React, { useState } from 'react';
import { useDocuments } from '../../hooks/useDocuments';

const DocumentSearch = () => {
    const [query, setQuery] = useState('');
    const { documents } = useDocuments();

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher des documents..."
                value={query}
                onChange={handleSearch}
            />
            <div>
                {filteredDocuments.length > 0 ? (
                    filteredDocuments.map(doc => (
                        <div key={doc.id}>
                            <h3>{doc.title}</h3>
                            <p>{doc.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucun document trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default DocumentSearch;