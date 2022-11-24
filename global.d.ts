interface ProductsInput {
  name: string;
  description: string;
  category: Category;
  cost: number;
  price: number;
  quantity: number;
}

interface EmployeesInput {
  firstName: string;
  lastName: string;
  contactNumber: number;
  email: string;
  role: Role;
}

interface InputValues extends ProductsInput, EmployeesInput {}

type UserCredentials = {
  username: string;
  password: string;
};

type Product = {
  id: string;
  docId: string;
  name: string;
  description: string | null;
  category: Category | null;
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

type CollectionName = "products" | "sales" | "employees";

type ItemType = "individual" | "collective";

type FormAction = "add" | "edit";

type Category = "fish" | "dog" | "materials" | "other";

type Role = "admin" | "manager" | "cashier" | "other";

// declare function getCurrency(value: number) {
//   return value.toLocaleString("en-PH", { currency: "PHP", style: "currency" });
// };
