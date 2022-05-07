import { useAppDispatch } from "../../redux-store/hooks/hooks";

const items: ProductQuery[] = [
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

const SortProducts = () => {
  //   const selectedQuery = useAppSelector((state) => state.products.productQuery);
  const dispatch = useAppDispatch();

  return (
    <div></div>
    // <Dropdown
    //   items={items}
    //   onSortHandler={(sortQuery) => dispatch(setProductQuery(sortQuery))}
    // />
  );
};

export default SortProducts;
