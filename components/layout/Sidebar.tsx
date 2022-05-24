import Link from "next/link";
import { FiBox } from "react-icons/fi";
import {
  IoPeopleOutline,
  IoReceiptOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {
  MdMenu,
  MdOutlineGroups,
  MdOutlineSpaceDashboard,
  MdPets,
} from "react-icons/md";
import { VscAccount, VscGraphLine, VscHistory } from "react-icons/vsc";
import SidebarNavLink from "./SidebarNavLink";

const SIDEBAR_DATA = [
  { title: "Dashboard", icon: MdOutlineSpaceDashboard },
  { title: "Products", icon: FiBox },
  { title: "Sales", icon: VscGraphLine },
  { title: "Expenses", icon: IoReceiptOutline },
  { title: "Customers", icon: IoPeopleOutline },
  { title: "Employees", icon: MdOutlineGroups },
  { title: "Accounts", icon: VscAccount },
  { title: "Logs", icon: VscHistory },
  { title: "Settings", icon: IoSettingsOutline },
];

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-10 w-52 h-full bg-primary-dark hidden md:block">
      <nav className="flex flex-col h-full text-xl text-[#AFB29C]">
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
          {SIDEBAR_DATA.slice(0, 6).map((item, index) => (
            <SidebarNavLink
              key={`nav-${index}`}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </ul>
        {/* Preferences */}
        <ul className="mt-auto mb-10">
          {SIDEBAR_DATA.map((item, index) => {
            if (index < 6) return;

            return (
              <SidebarNavLink
                key={`nav-${index}`}
                title={item.title}
                icon={item.icon}
              />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
