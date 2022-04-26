import { NextPage } from "next";
import { FiEdit } from "react-icons/fi";
import { MdAdd, MdOutlineArrowDropDown, MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import dogPic from "../../assets/chow_chow.png";
import fishPic from "../../assets/fish.png";

const Products: NextPage = () => {
  return (
    <div className="my-6 mx-12">
      {/* Products */}
      <div className="px-8 py-4 rounded-3xl bg-primary-light">
        <div className="flex justify-between text-lg">
          <div className="text-3xl text-[#AAA683] select-none">
            All Products
          </div>
          <input
            type="text"
            placeholder="Search"
            className="max-h-12 basis-80 rounded-2xl p-4"
          />
          <button className="flex justify-between items-center rounded-3xl bg-[#D1CEB2] basis-72 p-4">
            <div>
              sort by <span className="font-medium text-[#13240D]">Price</span>
            </div>
            <MdOutlineArrowDropDown size={24} />
          </button>
          <button className="flex justify-between items-center rounded-3xl bg-[#887F61] basis-48 text-yellow-50 p-4">
            <div>Add Items</div>
            <MdAdd size={24} />
          </button>
        </div>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-7 gap-x-4 gap-y-8 place-items-center select-none text-[#3A512B] text-xl">
          <div>{/* Empty Column */}</div>
          <div className="text-[#919F88] text-base">ID</div>
          <div className="text-[#919F88] text-base">NAME</div>
          <div className="text-[#919F88] text-base">CATEGORY</div>
          <div className="text-[#919F88] text-base">AGE</div>
          <div className="text-[#919F88] text-base">PRICE</div>
          <div className="text-[#919F88] text-base">ACTION</div>
          {/* Items */}
          <Image src={dogPic} alt="Picture of a dog" />
          <div>A841</div>
          <div>Chow Chow</div>
          <div>Dogs</div>
          <div>6 yrs.</div>
          <div>45,000</div>
          <div className="flex gap-4">
            <button>
              <FiEdit />
            </button>
            <button>
              <MdOutlineClose />
            </button>
          </div>
          <Image src={fishPic} alt="Picture of a fish" />
          <div>B174</div>
          <div>Polar parrot</div>
          <div>Fishes</div>
          <div>3 mths.</div>
          <div>1,000</div>
          <div className="flex gap-4">
            <button>
              <FiEdit />
            </button>
            <button>
              <MdOutlineClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
