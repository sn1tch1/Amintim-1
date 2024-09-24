// SideBar.js
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { FaCartShopping, FaBookmark, FaUser } from "react-icons/fa6";
import { IoMdHelpCircle } from "react-icons/io";
import { PiSignInBold, PiSignOut } from "react-icons/pi";
import { HiMiniSquares2X2 } from "react-icons/hi2";

function SideBar({ isOpen, onClose, finalFocusRef, isSignedIn }) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>

        <DrawerBody>
          {isSignedIn && (
            <>
              <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
                <FaUser size={25} /> My Account
              </div>
              <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
                <HiMiniSquares2X2 size={25} /> Soul Stars
              </div>
              <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
                <FaBookmark size={25} /> Bookmarks
              </div>
            </>
          )}
          <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
            <FaCartShopping size={25} /> Visit Store
          </div>
          <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
            <IoMdHelpCircle size={25} /> Help
          </div>
          {!isSignedIn && (
            <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
              <PiSignInBold size={25} /> Sign In
            </div>
          )}
          {isSignedIn && (
            <div className="flex gap-5 py-6 border-b border-gray-300 hover:bg-gray-100 cursor-pointer items-center px-3">
              <PiSignOut size={25} /> Sign Out
            </div>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default SideBar;
