import { collection, addDoc } from 'firebase/firestore';
import db from './firebaseInit';

/**
 * Add data to a Firestore collection
 * @param table Firestore collection name
 * @param data Data to add
 */
export async function addData(table: string, data: unknown): Promise<void> {
  const docRef = await addDoc(collection(db, table), data);

  if (docRef === null) {
    throw new Error('An error occurred while adding the data');
  }
}
