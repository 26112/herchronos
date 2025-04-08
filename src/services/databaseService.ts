
// Browser storage service (not SQLite)
import { UserProfile } from '@/types/period';

// Use indexedDB for browser storage
const DB_NAME = 'herchronos';
const STORE_NAME = 'userData';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

export const initDatabase = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!window.indexedDB) {
      console.error("Your browser doesn't support IndexedDB");
      resolve(false);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Database error:", event);
      resolve(false);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = (event) => {
      db = (event.target as IDBOpenDBRequest).result;
      console.log("Database initialized successfully");
      resolve(true);
    };
  });
};

export const saveUserProfile = (profile: UserProfile): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!db) {
      resolve(false);
      return;
    }

    try {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      
      const data = {
        id: 'current_user',
        profile: profile
      };
      
      const request = store.put(data);
      
      request.onsuccess = () => {
        resolve(true);
      };
      
      request.onerror = () => {
        console.error("Error saving user profile");
        resolve(false);
      };
    } catch (error) {
      console.error('Failed to save user profile:', error);
      resolve(false);
    }
  });
};

export const getUserProfile = (): Promise<UserProfile | null> => {
  return new Promise((resolve) => {
    if (!db) {
      resolve(null);
      return;
    }

    try {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get('current_user');
      
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result.profile);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => {
        console.error("Error getting user profile");
        resolve(null);
      };
    } catch (error) {
      console.error('Failed to get user profile:', error);
      resolve(null);
    }
  });
};

export const exportData = (): Promise<string | null> => {
  return new Promise((resolve) => {
    getUserProfile().then(profile => {
      if (profile) {
        resolve(JSON.stringify(profile));
      } else {
        resolve(null);
      }
    });
  });
};

export const importData = (data: string): Promise<boolean> => {
  return new Promise((resolve) => {
    try {
      const profile = JSON.parse(data);
      saveUserProfile(profile).then(resolve);
    } catch (error) {
      console.error('Failed to import data:', error);
      resolve(false);
    }
  });
};
