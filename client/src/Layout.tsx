import React from "react";
import { Navbar } from "./components/navbarComponents/Navbar";
import { Header } from "./components/HeaderComponts/Header";
import { UseAuthContext } from "./context/AuthContext";

type layoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: layoutProps) => {
  const { user } = UseAuthContext();

  return (
    <div className="flex w-screen h-screen bg-base-200">
      <Navbar user={user}></Navbar>
      <div className="flex flex-col flex-1 grow w-screen h-screen bg-base-100">
        <Header></Header>
        <div className="p-5 h-full">{children}</div>
      </div>
    </div>
  );
};
