import { NextPage } from "next";
import ActionsHeader from "../../components/layout/ActionsHeader";

const SORT_QUERIES: ProductQuery[] = [
  {
    sortQuery: "priceAsc",
    label: "Lowest Price",
  },
  {
    sortQuery: "priceDesc",
    label: "Highest Price",
  },
  {
    sortQuery: "latest",
    label: "Latest",
  },
];

const Expenses: NextPage = () => {
  return (
    <ActionsHeader
      title="Expenses"
      sortItems={SORT_QUERIES}
      selectedQuery={SORT_QUERIES[0]}
      onAddHandler={() => {}}
    />
  );
};

export default Expenses;
