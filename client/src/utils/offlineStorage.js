const DB_NAME = 'prof_senegal_offline';
const DB_VERSION = 1;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingActions')) {
        db.createObjectStore('pendingActions', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('cachedData')) {
        db.createObjectStore('cachedData', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Sauvegarder des données en cache local
export const cacheData = async (key, data) => {
  const db = await openDB();
  const tx = db.transaction('cachedData', 'readwrite');
  tx.objectStore('cachedData').put({ key, data, timestamp: Date.now() });
  return new Promise((resolve) => { tx.oncomplete = resolve; });
};

// Récupérer des données du cache local
export const getCachedData = async (key) => {
  const db = await openDB();
  const tx = db.transaction('cachedData', 'readonly');
  const request = tx.objectStore('cachedData').get(key);
  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result?.data || null);
  });
};

// Sauvegarder une action à synchroniser plus tard
export const savePendingAction = async (action) => {
  const db = await openDB();
  const tx = db.transaction('pendingActions', 'readwrite');
  tx.objectStore('pendingActions').add({
    ...action,
    timestamp: Date.now(),
  });
  return new Promise((resolve) => { tx.oncomplete = resolve; });
};

// Récupérer toutes les actions en attente
export const getPendingActions = async () => {
  const db = await openDB();
  const tx = db.transaction('pendingActions', 'readonly');
  const request = tx.objectStore('pendingActions').getAll();
  return new Promise((resolve) => {
    request.onsuccess = () => resolve(request.result || []);
  });
};

// Supprimer une action synchronisée
export const removePendingAction = async (id) => {
  const db = await openDB();
  const tx = db.transaction('pendingActions', 'readwrite');
  tx.objectStore('pendingActions').delete(id);
  return new Promise((resolve) => { tx.oncomplete = resolve; });
};

// Vérifier si on est en ligne
export const isOnline = () => navigator.onLine;