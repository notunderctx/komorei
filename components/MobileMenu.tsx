import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">
          <a href="/">Home</a>
        </div>
        <div className="px-3 text-center text-white hover:underline"></div>
        <div className="px-3 text-center text-white hover:underline"></div>
        <div className="px-3 text-center text-white hover:underline">
          <a href="/popular">Popular</a>
        </div>
        <div className="px-3 text-center text-white hover:underline">
          <p className="/trending">trending</p>
        </div>
        <div className="px-3 text-center text-white hover:underline"></div>
      </div>
    </div>
  );
};

export default MobileMenu;
