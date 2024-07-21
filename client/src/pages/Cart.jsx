import React from "react";

const Cart = () => {
  return (
    <div>
      <section className="flex flex-col gap-8 min-h-screen items-center justify-center">
        <div className="relative w-[52px] h-[52px]">
          <div>
            <span className=" bg-black rounded-full text-tiny p-2 absolute -top-2 -right-2 text-white">
              0
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
          Your shopping basket is empty
        </h4>
        <button className="py-4 px-8 font-[700] bg-black text-white hover:text-black hover:bg-transparent border-black border-2 ">
          Continue Shopping
        </button>
      </section>
    </div>
  );
};

export default Cart;
