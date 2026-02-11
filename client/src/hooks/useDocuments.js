import { useState, useEffect } from 'react';
import { getDocuments, deleteDocument } from '../api/documents';

const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await getDocuments();
      setDocuments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return { documents, loading, error, handleDelete, refetch: fetchDocs };
};

export default useDocuments;