import { collection, orderBy, query } from "firebase/firestore";
import { NextPage } from "next";
import { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdAdd, MdFilterList, MdOutlineArrowDropDown } from "react-icons/md";
import DeleteDialog from "../../components/products/DeleteProductDialog";
import EditProductForm from "../../components/products/EditProductForm";
import NewProductForm from "../../components/products/NewProductForm";
import ProductsTable from "../../components/products/ProductsTable";
import CircularProgressCentered from "../../components/UI/CircularProgressCentered";
import MuiModal from "../../components/UI/Modal";
import { db } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  setShowAddDialog,
  setShowDeleteDialog,
  setShowEditDialog,
} from "../../redux-store/slices/productsSlice";

const Products: NextPage = () => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("dateModified", "desc"));
  const [snapshot, loading, error] = useCollection(q);

  const { showAddDialog, showEditDialog, showDeleteDialog } = useAppSelector(
    (state) => ({
      showAddDialog: state.products.showAddDialog,
      showEditDialog: state.products.showEditDialog,
      showDeleteDialog: state.products.showDeleteDialog,
    })
  );

  const dispatch = useAppDispatch();

  if (loading) return <CircularProgressCentered />;

  const products: Product[] = snapshot!.docs.map((doc) => {
    const {
      id,
      name,
      price,
      month,
      quantity,
      year,
      category,
      itemType,
      description,
      imageUrl,
      dateAdded,
    } = doc.data();
    return {
      id,
      docId: doc.id,
      name,
      description,
      category,
      price,
      itemType,
      year,
      month,
      quantity,
      imageUrl,
      dateAdded,
    };
  });

  return (
    <Fragment>
      <MuiModal
        showModal={showAddDialog}
        onClose={() => dispatch(setShowAddDialog(false))}
      >
        <NewProductForm />
      </MuiModal>
      <MuiModal
        showModal={showEditDialog}
        onClose={() => dispatch(setShowEditDialog(false))}
      >
        <EditProductForm />
      </MuiModal>
      <DeleteDialog
        showDialog={showDeleteDialog}
        onClose={() => dispatch(setShowDeleteDialog(false))}
      />
      {/* Products Container */}
      <div className="mx-12 my-6 px-24 py-12 rounded-t-3xl shadow-md bg-primary-light h-screen max-h-screen overflow-y-scroll">
        <div className="flex justify-between items-center text-lg">
          <div className="text-3xl text-[#AAA683] select-none">
            All Products
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="max-h-14 basis-80 rounded-l-2xl p-4"
            />
            <button className="flex items-center gap-2 px-4 py-[14px] rounded-r-2xl font-medium bg-[#D1CEB2]">
              Filters
              <MdFilterList size={24} />
            </button>
          </div>
          <button className="btn-rounded max-h-14 bg-[#D1CEB2] basis-72">
            <div>
              Sort by <span className="font-medium text-[#13240D]">Latest</span>
            </div>
            <MdOutlineArrowDropDown size={24} />
          </button>
          <button
            onClick={() => dispatch(setShowAddDialog(true))}
            className="btn-rounded max-h-14 bg-[#887F61] basis-48 text-yellow-50"
          >
            <div>Add Items</div>
            <MdAdd size={24} />
          </button>
        </div>
        <ProductsTable products={products} />
      </div>
    </Fragment>
  );
};

export default Products;
