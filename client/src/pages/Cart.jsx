import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-hot-toast";
import BaseURL from "../utils/BaseURL";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const { removeFromCart, calculateSubtotal } = useCart();

  const [isLoading, setIsLoading] = useState(true);

  const groupCartItems = (cartItems) => {
    const groupedItems = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.id === item.id);
      const quantity = item.quantity || (item.type === "buy2" ? 2 : 1);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        acc.push({ ...item, quantity });
      }
      return acc;
    }, []);
    return groupedItems;
  };

  const groupedCart = groupCartItems(cart);

  const handleRemove = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    removeFromCart(itemId);
    toast.success("Removed from cart");
  };

  const SubTotal = calculateSubtotal().toFixed(2);

  return (
    <>
      {groupedCart.length > 0 ? (
        <div className="container mx-auto px-4 py-[100px]">
          <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
          <p className="mb-8">Shipping is free for your order</p>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="w-full md:w-2/3 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="text-left">Product</th>
                    <th className="text-left">Quantity</th>
                    <th className="text-left">Total amount</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedCart.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="flex items-center py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 mr-4"
                        />
                        <div>
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-gray-500">DKK {item.price}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-12 border text-center"
                          readOnly
                        />
                        <button
                          className="text-blue-500 ml-4"
                          onClick={() => handleRemove(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                      <td className="py-4">
                        DKK {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/3 p-4 border rounded-lg mt-4 md:mt-0">
              <h2 className="text-xl font-semibold mb-4">Subtotal</h2>
              <div className="flex justify-between mb-4">
                <p className="text-gray-500">DKK {SubTotal}</p>
              </div>
              <Link to="/checkout">
                <button className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                  To checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <section className="flex flex-col gap-8 min-h-screen items-center justify-center px-4 py-8">
          <div className="relative w-[52px] h-[52px]">
            <div>
              <span className="bg-black rounded-full text-tiny p-2 absolute -top-2 -right-2 text-white">
                0
              </span>
            </div>
            <svg
              role="presentation"
              strokeWidth="1.5"
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
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
          <h4 className="text-2xl font-berkshire font-extralight">
            {isLoading ? "Loading..." : "Your shopping basket is empty"}
          </h4>
          <Link to="/shop">
            <button className="py-4 px-8 font-[700] bg-black text-white hover:text-black hover:bg-transparent border-black border-2">
              Continue Shopping
            </button>
          </Link>
        </section>
      )}
    </>
  );
};

export default Cart;
