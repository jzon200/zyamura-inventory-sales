import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

import { db, storage } from "../../../firebase";
import { AppThunk } from "../../../redux/store";
import { setSelectedDocument } from "../reducers/firestoreReducer";
import {
  setShowDeleteDialog,
  setShowInputForm,
  setShowLoadingSpinner,
} from "../reducers/uiReducer";

function addDocumentData(
  data: InputValues,
  collectionName: CollectionName,
  imagePath: File | null = null
): AppThunk {
  return async (dispatch) => {
    const collectionRef = collection(db, collectionName);

    const id = Math.floor(Math.random() * 1000000);

    dispatch(setShowLoadingSpinner(true));
    try {
      let imageUrl: string | null = null;
      if (imagePath != null) {
        const storagePath = `${collectionName}/images/${uuid()}`;
        const storageRef = ref(storage, storagePath);

        await uploadBytes(storageRef, imagePath);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collectionRef, {
        ...data,
        id,
        imageUrl,
        dateAdded: serverTimestamp(),
        dateModified: serverTimestamp(),
      });
      console.log("Added Document successfully!");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowInputForm(false));
    }
  };
}

function editDocumentData(
  data: InputValues,
  collectionName: CollectionName,
  selectedDocument: DocumentData | null,
  imagePath: File | null
): AppThunk {
  return async (dispatch) => {
    const docRef = doc(db, collectionName, selectedDocument?.docId);

    dispatch(setShowLoadingSpinner(true));
    try {
      let imageUrl: string | null = selectedDocument?.imageUrl;

      if (imagePath != null) {
        const storagePath = `${collectionName}/images/${imagePath.name}`;
        const storageRef = ref(storage, storagePath);

        await uploadBytes(storageRef, imagePath);
        imageUrl = await getDownloadURL(storageRef);
      }

      await updateDoc(docRef, {
        ...data,
        imageUrl,
        dateModified: serverTimestamp(),
      });

      console.log(`Updated Document ${selectedDocument!.docId} successfully!`);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      dispatch(setSelectedDocument(null));
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowInputForm(false));
    }
  };
}

function deleteDocumentData(
  collectionName: CollectionName,
  selectedDocument: DocumentData | null
): AppThunk {
  return async (dispatch) => {
    const docRef = doc(db, collectionName, selectedDocument?.docId);

    dispatch(setShowLoadingSpinner(true));
    try {
      await deleteDoc(docRef);
      console.log(`Deleted Document ${selectedDocument!.docId} successfully!`);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      dispatch(setSelectedDocument(null));
      dispatch(setShowLoadingSpinner(false));
      dispatch(setShowDeleteDialog(false));
    }
  };
}

export { addDocumentData, editDocumentData, deleteDocumentData };
