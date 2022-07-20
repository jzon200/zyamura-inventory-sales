import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import {
  addAllItems,
  clearTransactions,
  setInitialItems,
} from "../slices/posSlice";
import { setShowLoadingSpinner } from "../slices/uiSlice";
import { AppThunk } from "../store";

const fetchProductsData = (): AppThunk => {
  return async (dispatch) => {
    const collectionRef = collection(db, "products");
    const latestProducts = query(
      collectionRef,
      orderBy("dateAdded", "desc")
      // where("quantity", "!=", 0)
    );

    const docSnap = await getDocs(latestProducts);
    const productsDocs: Product[] | DocumentData = docSnap.docs.map((doc) => {
      const dateAdded = doc.data().dateAdded as Timestamp;
      const dateModified = doc.data().dateModified as Timestamp;

      return {
        ...doc.data(),
        docId: doc.id,
        dateAdded: dateAdded
          ? dateAdded.toDate().toLocaleDateString()
          : dateAdded,
        dateModified: dateModified
          ? dateModified.toDate().toLocaleDateString()
          : dateModified,
      };
    });

    dispatch(addAllItems(productsDocs as Product[]));
    dispatch(setInitialItems(productsDocs as Product[]));
  };
};

const addSalesData = (purchasedItems: Product[]): AppThunk => {
  return async (dispatch) => {
    dispatch(setShowLoadingSpinner(true));

    const id = Math.floor(Math.random() * 1000000);

    // Decrease the quantity of products inventory
    // for every purchased items using Firestore Transaction
    for (const item of purchasedItems) {
      try {
        await runTransaction(db, async (transaction) => {
          const sfDocRef = doc(db, "products", item.docId);
          const sfDoc = await transaction.get(sfDocRef);
          if (!sfDoc.exists()) {
            throw "Document does not exist!";
          }

          const newQuantity = sfDoc.data().quantity - item.quantity;

          transaction.update(sfDocRef, { quantity: newQuantity });
        });
        console.log("Transaction successfully committed!");
      } catch (e) {
        console.log("Transaction failed: ", e);
      }
    }

    const totalPrice = purchasedItems
      .map((item) => item.price)
      .reduce((previousValue, currentValue) => {
        if (isNaN(currentValue)) {
          return previousValue;
        }
        return previousValue + currentValue;
      }, 0);

    await addDoc(collection(db, "sales"), {
      id,
      purchasedItems,
      author: "Admin",
      totalPrice,
      dateAdded: serverTimestamp(),
    });

    dispatch(clearTransactions());
    dispatch(setShowLoadingSpinner(false));
    dispatch(fetchProductsData());
  };
};

export { fetchProductsData, addSalesData };
