import React from "react";
import { Picker } from "./picker";

const Header = () => {
  return (
    <div className="pt-4 leading-7 text-[16px] font-bold flex justify-between">
      <div>Translation Management</div>
      <Picker />
    </div>
  );
};

export default Header;
