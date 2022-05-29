import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import DeleteDialog from "../../components/common/DeleteDialog";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowFormModal } from "../../redux/slices/uiSlice";
import ProductEntryForm from "../../components/pages/products/ProductEntryForm";
import MuiModal from "../../components/common/Modal";
import ProductsTable from "../../components/pages/products/ProductsDataGrid";
import ContentHeader from "../../components/header/ContentHeader";

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
      <ContentHeader title="All Products" sortItems={SORT_OBJECTS} />
      <ProductsTable />
    </Fragment>
  );
};

export default Products;
