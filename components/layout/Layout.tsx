import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="inventory-sales-page flex h-screen overflow-hidden">
      <main className="order-2 grow bg-surface">
        <div className="px-12 pt-12 pb-6 bg-primary-light h-full">
          {children}
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default Layout;
