import { orderBy } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";

import { DeleteDialog, MuiModal } from "../../../common/components";
import { ContentHeader } from "../../../features/modules/components";
import {
  ProductEntryForm,
  ProductsDataGrid,
} from "../../../features/modules/products";
import getServerSideAuth from "../../../lib/getServerSideAuth";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { initialSort } from "../../../redux/slices/firestoreSlice";
import { setShowFormModal } from "../../../redux/slices/uiSlice";

const SORT_OBJECTS = {
  nameAsc: {
    label: "Name A-Z",
    sortQuery: orderBy("name", "asc"),
  },
  nameDesc: {
    label: "Name Z-A",
    sortQuery: orderBy("name", "desc"),
  },
  quantityAsc: {
    label: "Lowest Quantity",
    sortQuery: orderBy("quantity", "asc"),
  },
  quantityDesc: {
    label: "Highest Quantity",
    sortQuery: orderBy("quantity", "desc"),
  },
  priceAsc: {
    label: "Lowest Price",
    sortQuery: orderBy("price", "asc"),
  },
  priceDesc: {
    label: "Highest Price",
    sortQuery: orderBy("price", "desc"),
  },
  latest: {
    label: "Latest",
    sortQuery: orderBy("dateAdded", "desc"),
  },
};

const Products: NextPage = () => {
  // TODO: Manage the State to prevent re-rendering
  const showFormModal = useAppSelector((state) => state.ui.showFormModal);

  const dispatch = useAppDispatch();

  dispatch(initialSort());

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
      <ProductsDataGrid />
    </Fragment>
  );
};

export const getServerSideProps = getServerSideAuth;

export default Products;
