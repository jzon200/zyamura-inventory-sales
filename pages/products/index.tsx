import { collection, orderBy, query } from "firebase/firestore";
import { NextPage } from "next";
import { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdAdd, MdFilterList, MdOutlineArrowDropDown } from "react-icons/md";
import NewProductForm from "../../components/products/NewProductForm";
import ProductsTable from "../../components/products/ProductsTable";
import DeleteDialog from "../../components/products/DeleteProductDialog";
import MuiModal from "../../components/UI/Modal";
import { db } from "../../lib/firebase";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  setShowAddDialog,
  setShowDeleteDialog,
} from "../../redux-store/slices/productsSlice";

const Products: NextPage = () => {
  const collectionRef = collection(db, "products");
  const q = query(collectionRef, orderBy("dateAdded", "desc"));
  const [products, loading, error] = useCollection(q);

  const { showAddDialog, showEditDialog, showDeleteDialog } = useAppSelector(
    (state) => ({
      showAddDialog: state.products.showAddDialog,
      showEditDialog: state.products.showEditDialog,
      showDeleteDialog: state.products.showDeleteDialog,
    })
  );

  const dispatch = useAppDispatch();

  if (loading) return null;

  return (
    <Fragment>
      <MuiModal
        showModal={showAddDialog}
        onClose={() => dispatch(setShowAddDialog(false))}
      >
        <NewProductForm />
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
        <ProductsTable
          products={products!.docs.map((doc) => ({
            ...doc.data(),
            docId: doc.id,
          }))}
        />
      </div>
    </Fragment>
  );
};

export default Products;
