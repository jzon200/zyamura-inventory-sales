import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchProductsData } from "../actions";
import InventoryCard from "./InventoryCard";

export default function InventoryGrid() {
  const products = useAppSelector((state) => state.pos.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      dispatch(fetchProductsData());
    }

    return () => {
      ignore = true;
    };
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
}
