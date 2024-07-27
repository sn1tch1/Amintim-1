import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          withCredentials: true,
        });
        setCart(response.data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    syncCartWithBackend(updatedCart);
  };

  const syncCartWithBackend = async (cart) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/sync",
        { cart },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to sync cart with backend:", error);
    }
  };

  return (
    <div>
      <section className="flex flex-col gap-8 min-h-screen items-center justify-center">
        <div className="relative w-[52px] h-[52px]">
          <div>
            <span className=" bg-black rounded-full text-tiny p-2 absolute -top-2 -right-2 text-white">
              {cart.length}
            </span>
          </div>
          <svg
            role="presentation"
            stroke-width="1.5"
            focusable="false"
            width="52"
            height="52"
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
        </div>
        <h4 className="text-2xl font-berkshire font-extralight">
          {isLoading ? "Loading..." : "Your shopping basket is empty"}
        </h4>
        <Link to="/shop">
          <button className="py-4 px-8 font-[700] bg-black text-white hover:text-black hover:bg-transparent border-black border-2 ">
            Continue Shopping
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Cart;
