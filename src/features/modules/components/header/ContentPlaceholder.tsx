import Image from "next/image";

export default function ContentPlaceholder() {
  return (
    <div className="grid h-4/5 place-items-center ">
      <Image
        src="/assets/svg/under_development.svg"
        width={720}
        height={720}
        alt=""
      />
      <div className="text-2xl text-slate-700 font-medium -mt-48">
        This Module is currently under development
      </div>
    </div>
  );
}
