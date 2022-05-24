import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="inventory-sales-page h-screen overflow-hidden">
      <Sidebar />
      <main className="h-full px-12 pt-12 pb-6 bg-primary-light md:ml-52">
        {children}
      </main>
    </div>
  );
};

export default Layout;
