import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import TableHeader from "../../components/layout/TableHeader";
import DeleteProductDialog from "../../components/products/DeleteProductDialog";
import EditProductForm from "../../components/products/EditProductForm";
import AddProductForm from "../../components/products/AddProductForm";
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
  // { label: "ITEM TYPE" },
  { label: "Quantity" },
  { label: "Cost" },
  { label: "PRICE" },
  { label: "ACTION" },
];

const SORT_QUERIES: ProductQuery[] = [
  {
    sortQuery: "nameAsc",
    label: "Name A-Z",
  },
  {
    sortQuery: "nameDesc",
    label: "Name Z-A",
  },
  {
    sortQuery: "priceAsc",
    label: "Lowest Price",
  },
  {
    sortQuery: "priceDesc",
    label: "Highest Price",
  },
  {
    sortQuery: "quantityAsc",
    label: "Lowest Quantity",
  },
  {
    sortQuery: "quantityDesc",
    label: "Highest Quantity",
  },
  {
    sortQuery: "latest",
    label: "Latest",
  },
];

const Products: NextPage = () => {
  const { showAddDialog, showEditDialog, showDeleteDialog, selectedQuery } =
    useAppSelector((state) => ({
      showAddDialog: state.products.showAddDialog,
      showEditDialog: state.products.showEditDialog,
      showDeleteDialog: state.products.showDeleteDialog,
      selectedQuery: state.products.productQuery,
    }));

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
        <AddProductForm />
      </MuiModal>
      <MuiModal
        showModal={showEditDialog}
        onClose={() => dispatch(setShowEditDialog(false))}
      >
        <EditProductForm />
      </MuiModal>
      <DeleteProductDialog
        showDialog={showDeleteDialog}
        onClose={() => dispatch(setShowDeleteDialog(false))}
      />
      {/* Products Container */}
      <ActionsHeader
        title="All Products"
        selectedQuery={selectedQuery}
        sortItems={SORT_QUERIES}
        // sortHandler={() => dispatch(setProductQuery(selectedSortQuery))}
        onAddHandler={() => dispatch(setShowAddDialog(true))}
      />
      <TableHeader items={TABLE_HEADERS} />
      <ProductsTable />
    </Fragment>
  );
};

export default Products;
