type Props = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const DropdownItem = ({ label, isSelected, onClick }: Props) => {
  return (
    <li
      className={`p-4 text-gray-500 cursor-pointer bg-white hover:bg-primary-light hover:text-gray-700 hover:font-medium last-of-type:rounded-b-3xl ${
        isSelected && "bg-primary-light text-gray-700 font-medium"
      } `}
      onClick={onClick}
    >
      {label}
    </li>
  );
};

export default DropdownItem;
