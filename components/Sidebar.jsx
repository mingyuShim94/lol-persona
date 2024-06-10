import React from "react";
import Logo from "./elements/Logo";
import History from "./elements/History";
const Sidebar = ({ children }) => {
  return (
    <div className="flex flex-row h-full">
      <nav className="w-[240px] border-r-[1px] border-neutral-200">
        <div className="p-[24px]">
          <Logo />
        </div>
        <History />
      </nav>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;
