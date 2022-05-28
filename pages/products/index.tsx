import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import ActionsHeader from "../../components/layout/ActionsHeader";
import ProductEntryForm from "../../components/products/ProductEntryForm";
import ProductsTable from "../../components/products/ProductsTable";
import DeleteDialog from "../../components/UI/DeleteDialog";
import MuiModal from "../../components/UI/Modal";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { setShowFormModal } from "../../redux-store/slices/uiSlice";

const SORT_OBJECTS = {
  nameAsc: {
    label: "Name A-Z",
    queryConstraint: orderBy("name", "asc"),
  },
  nameDesc: {
    label: "Name Z-A",
    queryConstraint: orderBy("name", "desc"),
  },
  priceAsc: {
    label: "Lowest Price",
    queryConstraint: orderBy("price", "asc"),
  },
  priceDesc: {
    label: "Highest Price",
    queryConstraint: orderBy("price", "desc"),
  },
  quantityAsc: {
    label: "Lowest Price",
    queryConstraint: orderBy("quantity", "asc"),
  },
  quantityDesc: {
    label: "Highest Price",
    queryConstraint: orderBy("quantity", "desc"),
  },
  latest: {
    label: "Latest",
    queryConstraint: orderBy("dateAdded", "desc"),
  },
};

const Products: NextPage = () => {
  // TODO: Manage the State to prevent re-rendering
  const showFormModal = useAppSelector((state) => state.ui.showFormModal);

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Head>
        <title>Products | Zyamura Mix Pet Shop Inventory & Sales System</title>
      </Head>
      <MuiModal
        showModal={showFormModal}
        onClose={() => {
          dispatch(setShowFormModal(false));
        }}
      >
        <ProductEntryForm />
      </MuiModal>
      <DeleteDialog collectionName="products" />
      {/* Products Container */}
      <ActionsHeader title="All Products" sortItems={SORT_OBJECTS} />
      <ProductsTable />
    </Fragment>
  );
};

export default Products;
