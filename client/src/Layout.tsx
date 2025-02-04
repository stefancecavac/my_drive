import React from "react";
import { Navbar } from "./components/navbarComponents/Navbar";
import { Header } from "./components/HeaderComponts/Header";

type layoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: layoutProps) => {
  return (
    <div className="flex w-screen h-screen bg-base-200">
      <Navbar></Navbar>
      <div className="flex flex-col flex-1 grow w-screen h-screen bg-base-100  shadow-md border-neutral">
        <Header></Header>
        <div className="p-5 h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
