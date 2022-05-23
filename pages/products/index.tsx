import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import DeleteProductDialog from "../../components/products/DeleteProductDialog";
import ProductEntryForm from "../../components/products/ProductEntryForm";
import ProductsTable from "../../components/products/ProductsTable";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setProduct } from "../../redux-store/slices/productsSlice";
import {
  setFormAction,
  setShowDeleteDialog,
  setShowFormModal,
} from "../../redux-store/slices/uiSlice";

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
  const { showFormModal, showDeleteDialog, selectedQuery } = useAppSelector(
    (state) => ({
      showFormModal: state.ui.showFormModal,
      showDeleteDialog: state.ui.showDeleteDialog,
      selectedQuery: state.products.productQuery,
    })
  );

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Head>
        <title>Products | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <MuiModal
        showModal={showFormModal}
        onClose={() => {
          dispatch(setProduct(null));
          dispatch(setShowFormModal(false));
        }}
      >
        <ProductEntryForm />
      </MuiModal>
      <DeleteProductDialog
        showDialog={showDeleteDialog}
        onClose={() => {
          dispatch(setProduct(null));
          dispatch(setShowDeleteDialog(false));
        }}
      />
      {/* Products Container */}
      <ActionsHeader
        title="All Products"
        selectedQuery={selectedQuery}
        sortItems={SORT_QUERIES}
        // sortHandler={() => dispatch(setProductQuery(selectedSortQuery))}
        onAddHandler={() => {
          dispatch(setProduct(null));
          dispatch(setFormAction("add"));
          dispatch(setShowFormModal(true));
        }}
      />
      <ProductsTable />
    </Fragment>
  );
};

export default Products;
