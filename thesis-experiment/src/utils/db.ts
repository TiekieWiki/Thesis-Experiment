import {
  collection,
  addDoc,
  QueryConstraint,
  type DocumentData,
  getDocs,
  query,
} from 'firebase/firestore';
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

/**
 * Get data from a Firestore collection
 * @param table Firestore collection name
 * @param tableQuery Firestore query constraint
 * @returns Firestore document data
 */
export async function getData(
  table: string,
  tableQuery?: QueryConstraint,
): Promise<DocumentData[]> {
  let querySnapshot;
  if (tableQuery === undefined) {
    querySnapshot = await getDocs(collection(db, table));
  } else {
    querySnapshot = await getDocs(query(collection(db, table), tableQuery));
  }

  if (!querySnapshot.empty) {
    const data = querySnapshot.docs.map(doc => doc.data());
    return data;
  } else {
    return [];
  }
}
