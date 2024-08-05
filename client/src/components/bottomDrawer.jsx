// SideBar.js
import React from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function BottomDrawer({
  isOpen,
  onClose,
  finalFocusRef,
  isLoggedIn,
  handleLogout,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent className="relative" bg={"transparent"}>
        <Box className="absolute bg-white  -top-12 -translate-x-1/2 left-1/2 flex items-center justify-center p-2 rounded-full shadow-lg">
          <RxCross2 size={22} onClick={onClose} />
        </Box>

        <DrawerBody bg={"white"}>
          <ul className="flex flex-col  gap-9 font-[500] text-[20px] mb-[200px]">
            <Link onClick={onClose} to="/" className="hover:text-black/70">
              <li>Home</li>
            </Link>
            <Link onClick={onClose} to="/shop" className="hover:text-black/70">
              <li>Shop</li>
            </Link>
            <Link
              onClick={onClose}
              to="/aboutus"
              className="hover:text-black/70"
            >
              <li>About Us</li>
            </Link>
            <Link
              onClick={onClose}
              to="/contact"
              className="hover:text-black/70"
            >
              <li>Contact</li>
            </Link>
            {isLoggedIn !== true ? (
              <Link
                onClick={onClose}
                to="/login"
                className="hover:text-black/70"
              >
                <li>Log In</li>
              </Link>
            ) : (
              <Link onClick={handleLogout} className="hover:text-black/70">
                <li>Log out</li>
              </Link>
            )}
          </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default BottomDrawer;
