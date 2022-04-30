import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";

const Layout: FC<{ children?: ReactNode }> = (props) => {
  return (
    <div className="flex h-screen">
      <main className="order-2 grow bg-surface overflow-hidden">
        {props.children}
      </main>
      <Sidebar />
    </div>
  );
};

export default Layout;
