import React from "react";
import { Navbar } from "./components/navbarComponents/Navbar";

type layoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: layoutProps) => {
  return (
    <div className="flex w-screen h-screen bg-base-100">
      <Navbar></Navbar>
      <div className="flex grow w-full h-full bg-base-200 p-5">{children}</div>
    </div>
  );
};
