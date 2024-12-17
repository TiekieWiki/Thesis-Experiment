import type { Checkpoint } from '../types/checkpoint';

const DB_NAME = 'CheckpointsDB';
const STORE_NAME = 'checkpoints';
const DB_VERSION = 1;

/**
 * Initialize the IndexedDB
 */
export function initDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Write a checkpoint to the database
 * @param checkpoint The checkpoint to write
 */
export async function writeCheckpoint(checkpoint: Checkpoint): Promise<void> {
  const db = await initDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put(checkpoint);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Get all checkpoints from the database
 * @returns All checkpoints
 */
export async function getAllCheckpoints(): Promise<Checkpoint[]> {
  const db = await initDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as Checkpoint[]);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Delete all checkpoints from the database
 */
export async function deleteAllCheckpoints(): Promise<void> {
  const db = await initDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
