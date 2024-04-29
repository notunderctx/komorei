/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "../app/komorei-28-04-2024.png";

import { Dialog } from "@headlessui/react";

import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import Search from "./Search";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}>
        <a href="/">
          <Image alt="logo" height={144} width={177} src={logo} />
        </a>

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="trending" />
          <NavbarItem label="popular" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">
            <button className="btn">
              <span className="icon">
                <svg viewBox="0 0 175 80" width="40" height="40">
                  <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                  <rect
                    y="30"
                    width="80"
                    height="15"
                    fill="#f0f0f0"
                    rx="10"></rect>
                  <rect
                    y="60"
                    width="80"
                    height="15"
                    fill="#f0f0f0"
                    rx="10"></rect>
                </svg>
              </span>
              <span className="text">MENU</span>
            </button>
          </p>

          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <MagnifyingGlassIcon
              className="w-6"
              onClick={() => setIsOpen(true)}
            />
          </div>

          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <Dialog.Panel className={`w-full max-w-sm rounded bg-black`}>
                <Search />
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
