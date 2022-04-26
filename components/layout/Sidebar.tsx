import { useRouter } from "next/router";
import { FC } from "react";
import { FiBox } from "react-icons/fi";
import {
  IoPeopleOutline,
  IoReceiptOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  { label: "Dashboard", icon: MdOutlineSpaceDashboard },
  { label: "Products", icon: FiBox },
  { label: "Sales", icon: IoReceiptOutline },
  { label: "Customers", icon: IoPeopleOutline },
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
      <nav className="flex flex-col justify-between text-xl text-[#AFB29C] h-full">
        <ul className="mt-40">
          {sidebarItems.slice(0, 4).map((item, index) => (
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
        <ul className="mb-10">
          {sidebarItems.map((item, index) => {
            if (index < 4) return;

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
