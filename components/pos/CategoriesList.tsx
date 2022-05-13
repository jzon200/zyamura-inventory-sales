import birdIcon from "../../assets/icons/ic-bird.png";
import dogIcon from "../../assets/icons/ic-dog.png";
import fishIcon from "../../assets/icons/ic-fish.png";
import hamsterIcon from "../../assets/icons/ic-hamster.png";
import hedgehogIcon from "../../assets/icons/ic-hedgehog.png";
import rabbitIcon from "../../assets/icons/ic-rabbit.png";
import allIcon from "../../assets/icons/ic-small-business.png";
import turtleIcon from "../../assets/icons/ic-turtle.png";
import petFoodIcon from "../../assets/icons/ic-pet-food.png";
import shelterIcon from "../../assets/icons/ic-dog-house.png";
import { StaticImageData } from "next/image";
import { useState } from "react";
import CategoryItem from "./CategoryItem";

type CategoryData = {
  label: string;
  imageData: StaticImageData;
  quantity: number;
};

const categoryData: CategoryData[] = [
  { label: "All", imageData: allIcon, quantity: 246 },
  { label: "Fish", imageData: fishIcon, quantity: 75 },
  { label: "Dog", imageData: dogIcon, quantity: 59 },
  { label: "Bird", imageData: birdIcon, quantity: 41 },
  { label: "Rabbit", imageData: rabbitIcon, quantity: 21 },
  { label: "Hedgehog", imageData: hedgehogIcon, quantity: 17 },
  { label: "Hamster", imageData: hamsterIcon, quantity: 16 },
  // { label: "All", imageData: allIcon, quantity: 246 },
  // { label: "All", imageData: allIcon, quantity: 246 },
];

const CategoriesList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="my-4 flex gap-4">
      {categoryData.map((category, index) => (
        <CategoryItem
          key={index}
          label={category.label}
          quantity={category.quantity}
          imageData={category.imageData}
          isSelected={selectedIndex === index}
          onClick={() => {
            setSelectedIndex(index);
          }}
        />
      ))}
    </div>
  );
};

export default CategoriesList;