import { NextPage } from "next";
import { Fragment } from "react";
import { MdAdd, MdFilterList } from "react-icons/md";
import TableGrid from "../../components/layout/TableGrid";
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
      <div className="mx-12 my-6 pt-12 pb-6 rounded-t-3xl shadow-md bg-primary-light h-screen max-h-screen">
        <div className="flex px-16 justify-between items-center text-lg">
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
          <Dropdown />
          <button
            onClick={() => dispatch(setShowAddDialog(true))}
            className="btn-rounded max-h-14 bg-[#887F61] basis-48 text-yellow-50"
          >
            <div>Add Items</div>
            <MdAdd size={24} />
          </button>
        </div>
        <TableGrid className="mt-16 text-[#3A512B] text-xl">
          {/* Header */}
          <div>{/* Empty Column */}</div>
          <div className="table-header">ID</div>
          <div className="table-header">NAME</div>
          <div className="table-header">CATEGORY</div>
          <div className="table-header">QUANTITY</div>
          <div className="table-header">PRICE</div>
          <div className="table-header">ACTION</div>
          {/* Items */}
        </TableGrid>
        <ProductsTable />
      </div>
    </Fragment>
  );
};

export default Products;
