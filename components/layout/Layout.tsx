import { ReactNode } from "react";
import Sidebar from "./Sidebar";

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <main className="order-2 grow bg-surface overflow-hidden">
        <div className="mx-12 my-6 pt-12 pb-6 rounded-t-3xl drop-shadow-xl bg-primary-light h-full max-h-screen">
          {children}
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default Layout;
