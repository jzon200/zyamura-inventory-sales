import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchProductsData } from "../../../redux/slices/posSlice";
import InventoryCard from "./InventoryCard";

const InventoryGrid = () => {
  const products = useAppSelector((state) => state.pos.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  return (
    <div
      className="grid gap-4 overflow-x-hidden overflow-y-auto m-6 mb-32 md:mb-0
    md:p-4 md:grid-cols-2 lg:grid-cols-3 lg:max-h-[40rem]"
    >
      {products.map((product: Product) => (
        <InventoryCard key={product.docId} product={product} />
      ))}
    </div>
  );
};

export default InventoryGrid;
