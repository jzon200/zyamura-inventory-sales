import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks/hooks";
import { fetchProductsData } from "../../redux-store/slices/posSlice";
import InventoryCard from "./InventoryCard";

const InventoryGrid = () => {
  const products = useAppSelector((state) => state.pos.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  return (
    <div
      className="grid gap-4 overflow-x-hidden overflow-y-auto
    md:p-4 md:grid-cols-2 lg:grid-cols-3 lg:max-h-[40rem]"
    >
      {products.map((product: Product) => (
        <InventoryCard key={product.docId} product={product} />
      ))}
    </div>
  );
};

export default InventoryGrid;
