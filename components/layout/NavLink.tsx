import Link from "next/link";
import { useRouter } from "next/router";
import { createElement } from "react";
import { IconType } from "react-icons";

type Props = {
  title: string;
  icon: IconType;
};

const NavLink = ({ title, icon }: Props) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const routeName = `/${title.toLowerCase()}`;
  const isSelected = currentRoute === routeName;

  return (
    <Link href={routeName} passHref>
      <div
        className={`${
          isSelected &&
          "border-l-8 border-primary-light bg-[#737E6D] text-primary-light font-bold"
        } font-nunito px-6 py-4 font-medium cursor-pointer hover:bg-[#737E6D] hover:text-primary-light`}
      >
        <li className={`${isSelected && "-ml-2"} flex gap-4 items-center`}>
          {/* Icon */}
          {createElement(icon, { width: 24 })}
          {title}
        </li>
      </div>
    </Link>
  );
};

export default NavLink;
