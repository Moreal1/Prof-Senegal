import React, { useState } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import { Button, Input, message } from 'antd';

const DocumentUpload = () => {
    const { uploadDocument } = useDocuments();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file || !title) {
            message.error('Please select a file and enter a title.');
            return;
        }

        const formData = new FormData();
        formData.append('document', file);
        formData.append('title', title);

        try {
            await uploadDocument(formData);
            message.success('Document uploaded successfully!');
            setFile(null);
            setTitle('');
        } catch (error) {
            message.error('Failed to upload document.');
        }
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <Input
                type="text"
                placeholder="Document Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Input
                type="file"
                onChange={handleFileChange}
            />
            <Button type="primary" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    );
};

export default DocumentUpload;