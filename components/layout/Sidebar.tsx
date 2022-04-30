import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { FiBox } from "react-icons/fi";
import {
  IoPeopleOutline,
  IoReceiptOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  MdGroups,
  MdMenu,
  MdOutlineSpaceDashboard,
  MdPets,
} from "react-icons/md";
import { VscAccount, VscGraphLine } from "react-icons/vsc";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  { label: "Dashboard", icon: MdOutlineSpaceDashboard },
  { label: "Products", icon: FiBox },
  { label: "Sales", icon: VscGraphLine },
  { label: "Expenses", icon: IoReceiptOutline },
  { label: "Customers", icon: IoPeopleOutline },
  { label: "Employees", icon: MdGroups },
  { label: "Accounts", icon: VscAccount },
  { label: "Settings", icon: IoSettingsOutline },
];

const Sidebar: FC = () => {
  const router = useRouter();

  const routeName = router.pathname.substring(1); // /dashboard => dashboard

  const routeHandler = (routeName: string) => {
    router.push(routeName.toLowerCase());
  };

  return (
    <aside className="hidden order-1 basis-52 bg-primary-dark md:block">
      <nav className="flex flex-col text-xl text-[#AFB29C] h-full max-h-screen">
        <div className="flex gap-2 items-center text-primary-light p-4 mt-4">
          <button className="ml-2">
            <MdMenu size={24} />
          </button>
          <Link href="/dashboard">
            <a className="flex items-center gap-1 font-sriracha text-2xl uppercase select-none">
              Zyamura <MdPets size={20} />
            </a>
          </Link>
        </div>
        <ul className="mt-24">
          {sidebarItems.slice(0, 6).map((item, index) => (
            <SidebarItem
              key={index}
              label={item.label}
              icon={item.icon}
              isSelected={routeName === item.label.toLowerCase()}
              onSelected={routeHandler.bind(null, item.label)}
            />
          ))}
        </ul>
        {/* Preferences */}
        <ul className="mt-auto mb-10">
          {sidebarItems.map((item, index) => {
            if (index < 6) return;

            return (
              <SidebarItem
                key={index}
                label={item.label}
                icon={item.icon}
                isSelected={routeName === item.label.toLowerCase()}
                onSelected={routeHandler.bind(null, item.label)}
              />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
