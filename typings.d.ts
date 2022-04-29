interface InputValues {
  id: string;
  name: string;
  description: string | null;
  category: Category;
  price: number;
  quantity: number;
  imagePath: FileList;
  imageUrl: string | null;
}

type Category = "fish" | "dog" | "materials" | "other";
