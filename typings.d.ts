interface InputValues {
  id: number;
  productName: string;
  description: string;
  category: Category;
  cost: number;
  price: number;
  quantity: number;
  imagePath: FileList;
  role: "admin" | "manager" | "cashier" | "other";
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
}

type Product = {
  id: string;
  docId: string;
  name: string;
  description: string;
  category: Category;
  itemType: ItemType;
  cost: number;
  price: number;
  quantity: number;
  imageUrl: string | null;
  dateAdded: string;
};

type Employee = {
  id: string;
  docId: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  role: string;
  imageUrl: string;
};

type Customer = {
  id: string;
  docId: string;
  name: string;
  contactNumber: string;
  email: string;
  role: string;
};

type Sales = {
  id: string;
  docId: string;
  author: string;
  purchasedItems: Product[];
  totalPrice: number;
  transactionDate: Date;
};

type ProductQuery = {
  sortQuery: SortQuery;
  label: SortLabel;
  queryConstraint?: ProductQueryConstraint;
  descending?: boolean;
};

type CustomerQuery = {
  sortQuery: SortQuery;
  label: SortLabel;
  queryConstraint?: "dateAdded" | "dateModified" | "name";
  descending?: boolean;
};

type EmployeeQuery = {
  sortQuery: SortQuery;
  label: SortLabel;
  queryConstraint?: "dateAdded" | "dateModified" | "name";
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
