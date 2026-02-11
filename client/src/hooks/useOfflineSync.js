import { useState, useEffect, useCallback } from 'react';
import { savePendingAction, getPendingActions, removePendingAction, cacheData, getCachedData, isOnline } from '../utils/offlineStorage';
import API from '../api/auth';

const useOfflineSync = () => {
  const [online, setOnline] = useState(isOnline());
  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  // Écouter les changements de connexion
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      syncPendingActions();
    };
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Compter les actions en attente
    getPendingActions().then((actions) => setPendingCount(actions.length));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Synchroniser les actions en attente
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

  // Faire une requête API avec fallback hors ligne
  const offlineRequest = useCallback(async ({ method, url, data, cacheKey }) => {
    if (isOnline()) {
      try {
        const res = await API({ method, url, data });
        // Mettre en cache les GET
        if (method === 'get' && cacheKey) {
          await cacheData(cacheKey, res.data);
        }
        return res.data;
      } catch (err) {
        // Si échec réseau sur GET, tenter le cache
        if (method === 'get' && cacheKey) {
          const cached = await getCachedData(cacheKey);
          if (cached) return cached;
        }
        throw err;
      }
    } else {
      if (method === 'get') {
        // Hors ligne : lire depuis le cache
        const cached = await getCachedData(cacheKey);
        if (cached) return cached;
        throw new Error('Pas de données en cache');
      } else {
        // Hors ligne : sauvegarder l'action pour plus tard
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