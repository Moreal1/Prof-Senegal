import { useState, useEffect } from 'react';
import { getSchedules } from '../api/schedules';

const useSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const res = await getSchedules();
      setSchedules(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, error, refetch: fetchSchedules };
};

export default useSchedule;