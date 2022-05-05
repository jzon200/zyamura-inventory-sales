import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import { MdAdd, MdFilterList } from "react-icons/md";
import TableHeader from "../../components/layout/Table";
import DeleteDialog from "../../components/products/DeleteProductDialog";
import EditProductForm from "../../components/products/EditProductForm";
import NewProductForm from "../../components/products/NewProductForm";
import ProductsTable from "../../components/products/ProductsTable";
import Dropdown from "../../components/UI/Dropdown";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import {
  setShowAddDialog,
  setShowDeleteDialog,
  setShowEditDialog,
} from "../../redux-store/slices/productsSlice";

const TABLE_HEADERS = [
  { label: "" },
  { label: "ID" },
  { label: "NAME" },
  { label: "CATEGORY" },
  // { label: "Quantity" },
  { label: "ITEM TYPE" },
  { label: "PRICE" },
  { label: "ACTION" },
];

const Products: NextPage = () => {
  const { showAddDialog, showEditDialog, showDeleteDialog } = useAppSelector(
    (state) => ({
      showAddDialog: state.products.showAddDialog,
      showEditDialog: state.products.showEditDialog,
      showDeleteDialog: state.products.showDeleteDialog,
    })
  );

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Head>
        <title>Products | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
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
      <div className="flex px-16 justify-between items-center text-lg">
        <div className="text-3xl text-[#AAA683] select-none">All Products</div>
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
        <Dropdown />
        <button
          onClick={() => dispatch(setShowAddDialog(true))}
          className="btn-rounded max-h-14 bg-[#887F61] basis-48 text-yellow-50"
        >
          <div>Add Items</div>
          <MdAdd size={24} />
        </button>
      </div>
      <TableHeader items={TABLE_HEADERS} />
      <ProductsTable />
    </Fragment>
  );
};

export default Products;
