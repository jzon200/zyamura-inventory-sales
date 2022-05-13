import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="sidebar flex h-screen">
      <main className="order-2 grow bg-surface">
        <div className="px-12 pt-12 pb-6 bg-primary-light h-full overflow-y-scroll">
          {children}
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default Layout;
