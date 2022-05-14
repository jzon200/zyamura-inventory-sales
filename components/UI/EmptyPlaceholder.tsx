import Image from "next/image";
import imgPlaceholder from "../../assets/under_production.svg";

const EmptyPlaceholder = () => {
  return (
    <div className="grid h-4/5 place-items-center ">
      <Image src={imgPlaceholder} width={720} height={720} />
      <div className="text-2xl text-slate-700 font-medium -mt-48">
        This Module is currently under development
      </div>
    </div>
  );
};

export default EmptyPlaceholder;
