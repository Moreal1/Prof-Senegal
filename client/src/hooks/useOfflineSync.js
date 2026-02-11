import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { savePendingAction, getPendingActions, removePendingAction, cacheData, getCachedData, isOnline } from '../utils/offlineStorage';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useOfflineSync = () => {
  const [online, setOnline] = useState(isOnline());
  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      syncPendingActions();
    };
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    getPendingActions().then((actions) => setPendingCount(actions.length));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncPendingActions = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);

    try {
      const actions = await getPendingActions();
      for (const action of actions) {
        try {
          await API({
            method: action.method,
            url: action.url,
            data: action.data,
          });
          await removePendingAction(action.id);
        } catch (err) {
          console.error('Sync failed for action:', action, err);
        }
      }
      const remaining = await getPendingActions();
      setPendingCount(remaining.length);
    } finally {
      setSyncing(false);
    }
  }, [syncing]);

  const offlineRequest = useCallback(async ({ method, url, data, cacheKey }) => {
    if (isOnline()) {
      try {
        const res = await API({ method, url, data });
        if (method === 'get' && cacheKey) {
          await cacheData(cacheKey, res.data);
        }
        return res.data;
      } catch (err) {
        if (method === 'get' && cacheKey) {
          const cached = await getCachedData(cacheKey);
          if (cached) return cached;
        }
        throw err;
      }
    } else {
      if (method === 'get') {
        const cached = await getCachedData(cacheKey);
        if (cached) return cached;
        throw new Error('Pas de données en cache');
      } else {
        await savePendingAction({ method, url, data });
        const newCount = (await getPendingActions()).length;
        setPendingCount(newCount);
        return { offline: true, message: 'Action sauvegardée, sera synchronisée en ligne' };
      }
    }
  }, []);

  return { online, syncing, pendingCount, syncPendingActions, offlineRequest };
};

export default useOfflineSync;