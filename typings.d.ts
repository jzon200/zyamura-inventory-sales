interface InputValues {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  quantity?: number | null;
  year?: number | null;
  month?: number | null;
  imagePath: FileList;
}

type Product = {
  id: string;
  docId: string;
  name: string;
  description: string;
  category: Category;
  itemType: ItemType;
  price: number;
  quantity?: number | null;
  year?: number | null;
  month?: number | null;
  imageUrl: string | null;
  dateAdded: string;
};

type ProductQuery = {
  sort: SortQuery;
  label: SortLabel;
  queryConstraint: ProductQueryConstraint;
  descending?: boolean;
};

type ItemType = "individual" | "collective";

type Category = "fish" | "dog" | "materials" | "other";

type ProductQueryConstraint =
  | "dateAdded"
  | "dateModified"
  | "price"
  | "quantity"
  | "name";

type SortLabel =
  | "Latest"
  | "Highest Price"
  | "Lowest Price"
  | "Lowest Quantity"
  | "Highest Quantity"
  | "Name A-Z"
  | "Name Z-A";

type SortQuery =
  | "latest"
  | "priceAsc"
  | "priceDesc"
  | "quantityAsc"
  | "quantityDesc"
  | "nameAsc"
  | "nameDesc";
