import React from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import DocumentGrid from './DocumentGrid';

const FolderView = () => {
    const { documents, loading, error } = useDocuments();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading documents: {error.message}</div>;
    }

    return (
        <div>
            <h2>Documents</h2>
            <DocumentGrid documents={documents} />
        </div>
    );
};

export default FolderView;