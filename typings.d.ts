interface InputValues {
  name: string;
  description: string;
  category: Category;
  price: number;
  quantity: number;
  imagePath: FileList;
}

type Product = {
  id: string;
  docId: string;
  name: string;
  description: string;
  category: Category;
  price: number;
  quantity: number;
  imageUrl: string | null;
};

type Category = "fish" | "dog" | "materials" | "other";
