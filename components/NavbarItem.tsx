import Link from "next/link";
import React from "react";

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
  return (
    <div
      className={
        active
          ? "text-white cursor-default"
          : "text-gray-200 hover:text-orange-400 cursor-pointer  hover:text-action/80 transition-all duration-150 ease-linear"
      }>
      <Link href={label === "home" ? "/" : `/${label}`}>{label}</Link>
    </div>
  );
};

export default NavbarItem;
