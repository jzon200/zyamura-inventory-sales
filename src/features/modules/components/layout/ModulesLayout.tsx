import { ReactNode } from "react";
import Sidebar from "../navigation/Sidebar";

type Props = {
  children: ReactNode;
};

import React from "react";

export default function ModulesLayout({ children }: Props) {
  return (
    <div className="inventory-sales-page h-screen overflow-hidden">
      <Sidebar />
      <main className="h-full px-12 pt-12 pb-6 bg-primary-light md:ml-52">
        {children}
      </main>
    </div>
  );
}
