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
  itemType: string;
  price: number;
  quantity?: number | null;
  year?: number | null;
  month?: number | null;
  imageUrl: string | null;
  dateAdded: string;
};

type Category = "fish" | "dog" | "materials" | "other";
