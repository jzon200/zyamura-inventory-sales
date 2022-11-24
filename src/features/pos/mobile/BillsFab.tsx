import Image from "next/image";
import { useAppSelector } from "../../../redux/hooks";

export default function BillsFab() {
  const purchasedItems = useAppSelector((state) => state.pos.purchasedItems);

  const totalQuantity = purchasedItems
    .map((item) => item.quantity)
    .reduce((previousValue, currentValue) => {
      if (isNaN(currentValue)) {
        return previousValue;
      }
      return previousValue + currentValue;
    }, 0);

  const badgeLabel = totalQuantity > 1000 ? "999+" : totalQuantity;

  return (
    <button className="fixed lg:hidden bottom-8 right-2 grid place-items-center w-20 h-20 rounded-3xl bg-emerald-300 text-white shadow-md shadow-gray-400/80">
      <Image
        src={"/assets/icons/ic-cash-register.png"}
        width={52}
        height={52}
        alt=""
      />
      <div className="absolute grid place-items-center top-0 right-0 px-1 h-5 rounded-full bg-red-400 text-white text-sm">
        {badgeLabel}
      </div>
    </button>
  );
}
