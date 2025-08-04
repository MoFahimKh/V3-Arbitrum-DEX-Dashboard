import React from "react";
import { Navbar } from "@/components/Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-black flex flex-col">
      <Navbar />
      <main className="flex-1 w-full mx-auto max-w-7xl">{children}</main>
    </div>
  );
};
