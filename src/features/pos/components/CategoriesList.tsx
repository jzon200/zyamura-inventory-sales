import { useState } from "react";

import CategoryItem from "./CategoryItem";

type CategoryData = {
  label: string;
  imageUrl: string;
  quantity: number;
};

const categoryData: CategoryData[] = [
  {
    label: "All",
    imageUrl: "/assets/icons/ic-small-business.png",
    quantity: 246,
  },
  { label: "Fish", imageUrl: "/assets/icons/ic-fish.png", quantity: 75 },
  { label: "Dog", imageUrl: "/assets/icons/ic-dog.png", quantity: 59 },
  { label: "Bird", imageUrl: "/assets/icons/ic-bird.png", quantity: 41 },
  { label: "Rabbit", imageUrl: "/assets/icons/ic-rabbit.png", quantity: 21 },
  {
    label: "Hedgehog",
    imageUrl: "/assets/icons/ic-hedgehog.png",
    quantity: 17,
  },
  { label: "Hamster", imageUrl: "/assets/icons/ic-hamster.png", quantity: 16 },
  // { label: "Turtle", imageData: turtleIcon, quantity: 20 },
  // { label: "Pet Food", imageData: petFoodIcon, quantity: 20 },
  // { label: "All", imageData: allIcon, quantity: 246 },
];

export default function CategoriesList() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // TODO: Carousel Version
  return (
    <div className="absolute lg:static top-16 mx-4 lg:mx-0 p-4 lg:p-0 rounded-xl bg-white z-10 overflow-x-auto shadow-md lg:shadow-none shadow-gray-400">
      <div className="grid grid-flow-col auto-cols-fr">
        {categoryData.map((category, index) => (
          <CategoryItem
            key={index}
            label={category.label}
            quantity={category.quantity}
            imageUrl={category.imageUrl}
            isSelected={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
