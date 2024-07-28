import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import BottomDrawer from "./bottomDrawer";
import Logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const btnRef = useRef();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/logout"
      );
      if (response.status === 201 || 200) {
        toast.success("Logged Out");
        navigate("/");
        logout();
      } else {
        console.log("responseeee", response);
      }
    } catch (error) {
      toast.error("Error logging in. Please try again catch.");
    }
  };

  return (
    <>
      <header className="bg-[#F7F7F7] z-[100] px-[20px] py-[10px] hidden  lg:flex fixed top-0 w-full items-center justify-between">
        <div className="h-[50px] w-auto">
          <img src={Logo} alt="" className="w-full h-full" />
        </div>
        <ul className="flex gap-10 font-[700] text-[16px]">
          <Link to="/" className="hover:text-black/70">
            <li>Home</li>
          </Link>
          <Link to="/shop" className="hover:text-black/70">
            <li>Shop</li>
          </Link>
          <Link to="/aboutus" className="hover:text-black/70">
            <li>About Us</li>
          </Link>
          <Link to="/contact" className="hover:text-black/70">
            <li>Contact</li>
          </Link>
          {isLoggedIn !== true ? (
            <Link to="/login" className="hover:text-black/70">
              <li>Log In</li>
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:text-black/70">
              <li>Log out</li>
            </button>
          )}
        </ul>

        <div className="flex items-center gap-5">
          {/* <Select
          border="none"
          outline="none"
          size="sm"
          width={"200px"}
          placeholder="(United States) USD $"
          className="font-[500]"
        >
          <option value="USD">(United States) USD $</option>
          <option value="EUR">(Eurozone) EUR €</option>
          <option value="GBP">(United Kingdom) GBP £</option>
          <option value="AUD">(Australia) AUD $</option>
          <option value="CAD">(Canada) CAD $</option>
          <option value="CHF">(Switzerland) CHF Fr</option>
          <option value="CNY">(China) CNY ¥</option>
          <option value="JPY">(Japan) JPY ¥</option>
          <option value="INR">(India) INR ₹</option>
          <option value="RUB">(Russia) RUB ₽</option>
          <option value="BRL">(Brazil) BRL R$</option>
          <option value="ZAR">(South Africa) ZAR R</option>
          <option value="SGD">(Singapore) SGD $</option>
          <option value="HKD">(Hong Kong) HKD $</option>
          <option value="KRW">(South Korea) KRW ₩</option>
          <option value="MXN">(Mexico) MXN $</option>
          <option value="NOK">(Norway) NOK kr</option>
          <option value="NZD">(New Zealand) NZD $</option>
          <option value="SEK">(Sweden) SEK kr</option>
          <option value="TRY">(Turkey) TRY ₺</option>
          <option value="PLN">(Poland) PLN zł</option>
          <option value="AED">(United Arab Emirates) AED د.إ</option>
          <option value="SAR">(Saudi Arabia) SAR ر.س</option>
          <option value="THB">(Thailand) THB ฿</option>
          <option value="IDR">(Indonesia) IDR Rp</option>
          <option value="VND">(Vietnam) VND ₫</option>
          <option value="MYR">(Malaysia) MYR RM</option>
          <option value="PKR">(Pakistan) PKR Rs.</option>
        </Select>
        <Select
          border="none"
          outline="none"
          width={"90px"}
          size="sm"
          placeholder="English"
          className="font-[500]"
        >
          <option value="English">English</option>
          <option value="Italian">Italian</option>
          <option value="French">French</option>
          <option value="Russian">Russian</option>
          <option value="Dutch">Dutch</option>
          <option value="Turkish">Turkish</option>
          <option value="Polish">Polish</option>
          <option value="Ukranian">Ukranian</option>
          <option value="Arabic">Arabic</option>
        </Select> */}
          <Link to={"/manage-account/settings"} className="w-[22px] h-[22px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
          <Link to={"/cart"} className="relative w-[22px] h-[22px]">
            {cartItems.length >= 1 && (
              <span className="rounded-full bg-gray-700 text-white absolute w-[17px] h-[17px] top-0 left-3 flex items-center justify-center">
                <p className="text-[14px] font-[800] p-[2px]">
                  {cartItems.length}
                </p>
              </span>
            )}
            <svg
              role="presentation"
              stroke-width="1.5"
              focusable="false"
              width="22"
              height="22"
              className="icon icon-cart"
              viewBox="0 0 22 22"
            >
              <path
                d="M11 7H3.577A2 2 0 0 0 1.64 9.497l2.051 8A2 2 0 0 0 5.63 19H16.37a2 2 0 0 0 1.937-1.503l2.052-8A2 2 0 0 0 18.422 7H11Zm0 0V1"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </Link>
        </div>
      </header>

      {/* for small devices */}
      <header className="lg:hidden z-[100] bg-white p-4 border-black border-b-2 fixed top-0 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <button ref={btnRef} onClick={openDrawer} className="text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <BottomDrawer
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            finalFocusRef={btnRef}
          />
          <h1 className="text-xl mx-auto font-bold">Amintim✨</h1>
          <div className="flex items-center gap-3">
            <Link to={"/manage-account/settings"} className="w-[22px] h-[22px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>
            <Link to={"/cart"} className="w-[22px] h-[22px]">
              <svg
                role="presentation"
                stroke-width="1.5"
                focusable="false"
                width="22"
                height="22"
                className="icon icon-cart"
                viewBox="0 0 22 22"
              >
                <path
                  d="M11 7H3.577A2 2 0 0 0 1.64 9.497l2.051 8A2 2 0 0 0 5.63 19H16.37a2 2 0 0 0 1.937-1.503l2.052-8A2 2 0 0 0 18.422 7H11Zm0 0V1"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
