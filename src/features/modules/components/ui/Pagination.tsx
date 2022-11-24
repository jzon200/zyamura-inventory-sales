import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type Props = {
  currentPage: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
  onPrevPage?: () => void;
  onNextPage?: () => void;
};

export default function Pagination({
  currentPage,
  nextDisabled,
  prevDisabled,
  onPrevPage,
  onNextPage,
}: Props) {
  return (
    <div
      className="flex justify-center items-center gap-2
     text-lg text-[#3A512B]">
      <button
        className="disabled:text-gray-400"
        onClick={onPrevPage}
        disabled={prevDisabled}>
        <MdArrowBackIos size={24} />
      </button>
      <input
        className="w-10 bg-transparent border-b border-[#919F88]
         text-center"
        type="number"
        min="1"
        max="99"
        defaultValue={currentPage}
      />
      <button
        className="disabled:text-gray-400"
        onClick={onNextPage}
        disabled={nextDisabled}>
        <MdArrowForwardIos size={24} />
      </button>
      <div
        className="w-7 px-2 rounded bg-[#919F88]
       text-primary-light text-center cursor-pointer">
        1
      </div>
      <div className="px-2 rounded border border-transparent hover:border-[#919F88] text-center cursor-pointer">
        2
      </div>
      <div className="px-2 rounded border border-transparent hover:border-[#919F88] text-center cursor-pointer">
        3
      </div>
      <div className="px-2 rounded border border-transparent hover:border-[#919F88] text-center cursor-pointer">
        4
      </div>
      <div className="px-2">...</div>
      <div className="px-2 rounded border border-transparent hover:border-[#919F88] cursor-pointer">
        42
      </div>
    </div>
  );
}
