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
import { Link } from "react-router-dom";

function BottomDrawer({ isOpen, onClose, finalFocusRef, isSignedIn }) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>

        <DrawerBody>
          <ul className="flex flex-col gap-9 font-[700] text-[23px] mb-[300px]">
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
            <Link onClick={onClose} to="/login" className="hover:text-black/70">
              <li>Log In</li>
            </Link>
          </ul>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default BottomDrawer;
