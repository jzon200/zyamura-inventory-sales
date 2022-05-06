import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import DeleteDialog from "../../components/products/DeleteProductDialog";
import EditProductForm from "../../components/products/EditProductForm";
import NewProductForm from "../../components/products/NewProductForm";
import ProductsTable from "../../components/products/ProductsTable";
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
      <ActionsHeader
        title="All Products"
        onAddHandler={() => dispatch(setShowAddDialog(true))}
      />
      <TableHeader items={TABLE_HEADERS} />
      <ProductsTable />
    </Fragment>
  );
};

export default Products;
