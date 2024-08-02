import React, { useState } from "react";
import Image from "../assets/shop/img-1.webp";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Spinner } from "@chakra-ui/react";
import BaseURL from "../utils/BaseURL";

const Checkout = () => {
  const { calculateSubtotal, clearCart } = useCart();
  const navigate = useNavigate(); // Initialize the navigate function
  const { isLoggedIn } = useAuth(); // Get login status from context
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    newsEmail: false,
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: "Iceland",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    securityCode: "",
    cardHolderName: "",
  });

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

  const handleInputChange = (e, setState) => {
    const { id, value, type, checked } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () => {
    const { email } = contactInfo;
    const { firstName, lastName, address, postalCode, city } = deliveryInfo;
    const { cardNumber, expiryDate, securityCode, cardHolderName } =
      paymentInfo;
    return (
      email &&
      address &&
      postalCode &&
      city &&
      cardNumber &&
      expiryDate &&
      securityCode &&
      cardHolderName
    );
  };

  const SubTotal = calculateSubtotal().toFixed(2);

  const handlePurchase = async () => {
    if (!isFormValid()) return; // Prevent submission if form is invalid
    setLoading(true);

    try {
      const response = await fetch(`${BaseURL}/purchase/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials with the request
        body: JSON.stringify({
          deliveryInfo, // Send only delivery details
        }),
      });

      if (!response.ok) {
        toast.error("Error Occured");
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success("Soulstar Purchased");
      localStorage.removeItem("cartItems");
      clearCart();
      navigate("/tribute");
      console.log("Purchase successful:", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md flex flex-col lg:flex-row">
      {!isLoggedIn && (
        <div className="fixed top-16 left-0 w-full bg-red-800 text-[12px] text-white text-center py-1 z-50">
          <p>You must be logged in to complete your purchase.</p>
        </div>
      )}
      <div className="w-full lg:w-3/5 px-4 py-6 lg:px-12 lg:py-[100px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <div className="mb-6">
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            type="text"
            id="email"
            value={contactInfo.email}
            onChange={(e) => handleInputChange(e, setContactInfo)}
            placeholder="Email or mobile number"
          />
          <div className="flex items-center">
            <input
              className="mr-2"
              id="newsEmail"
              type="checkbox"
              checked={contactInfo.newsEmail}
              onChange={(e) => handleInputChange(e, setContactInfo)}
            />
            <label className="font-medium" htmlFor="newsEmail">
              Receive news and updates via email
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Delivery</h2>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-medium mb-2" htmlFor="countryRegion">
              Country/Region
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              id="country"
              value={deliveryInfo.country}
              onChange={(e) => handleInputChange(e, setDeliveryInfo)}
            >
              <option>Iceland</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="firstName">
                First name
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="firstName"
                type="text"
                value={deliveryInfo.firstName}
                onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                placeholder="First name"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="lastName">
                Last name (optional)
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="lastName"
                type="text"
                value={deliveryInfo.lastName}
                onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                placeholder="Last name"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              id="address"
              type="text"
              value={deliveryInfo.address}
              onChange={(e) => handleInputChange(e, setDeliveryInfo)}
              placeholder="Address"
            />
          </div>
          <div>
            <label className="block font-medium mb-2" htmlFor="apartment">
              Apartment, room, etc. (optional)
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              id="apartment"
              type="text"
              value={deliveryInfo.apartment}
              onChange={(e) => handleInputChange(e, setDeliveryInfo)}
              placeholder="Apartment, room, etc."
            />
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="postalCode">
                Postal code
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="postalCode"
                type="text"
                value={deliveryInfo.postalCode}
                onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                placeholder="Postal code"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="city">
                City
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="city"
                type="text"
                value={deliveryInfo.city}
                onChange={(e) => handleInputChange(e, setDeliveryInfo)}
                placeholder="City"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <p className="mb-6">All transactions are secure and encrypted.</p>

        <div className="border p-4 rounded-lg mb-4 bg-gray-50">
          <div className="border-b pb-2 mb-4">
            <h3 className="text-xl font-semibold">Credit card</h3>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-2" htmlFor="cardNumber">
                Card number
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="cardNumber"
                type="text"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                placeholder="Card number"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <label className="block font-medium mb-2" htmlFor="expiryDate">
                  Valid until (MM / YY)
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="expiryDate"
                  type="text"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => handleInputChange(e, setPaymentInfo)}
                  placeholder="Valid until (MM / YY)"
                />
              </div>
              <div className="flex-1">
                <label
                  className="block font-medium mb-2"
                  htmlFor="securityCode"
                >
                  Security code
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="securityCode"
                  type="text"
                  value={paymentInfo.securityCode}
                  onChange={(e) => handleInputChange(e, setPaymentInfo)}
                  placeholder="Security code"
                />
              </div>
            </div>
            <div>
              <label
                className="block font-medium mb-2"
                htmlFor="cardHolderName"
              >
                Name of Cardholder
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="cardHolderName"
                type="text"
                value={paymentInfo.cardHolderName}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                placeholder="Name of Cardholder"
              />
            </div>
          </form>
        </div>

        <div className="mb-4">
          <label className="font-medium mb-2" htmlFor="saveInfo">
            <input
              className="mr-2"
              id="saveInfo"
              type="checkbox"
              checked={contactInfo.saveInfo}
              onChange={(e) => handleInputChange(e, setContactInfo)}
            />
            Securely save my information for 1-click checkout
          </label>
        </div>
      </div>

      <div className="w-full lg:w-2/5 px-4 py-6 lg:px-12 lg:py-12 bg-gray-100">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {groupedCart.map((item, index) => (
            <tr
              key={index}
              className="border-b flex items-center justify-between"
            >
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
              <td className="py-4">{item.quantity}</td>
            </tr>
          ))}
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800 font-medium">DKK {SubTotal}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800 font-medium">00.00</p>
          </div>
          <div className="flex justify-between font-bold items-center mb-6">
            <p className="text-gray-600">Total</p>
            <p className="text-gray-800 font-medium">DKK {SubTotal}</p>
          </div>
          <button
            className={`w-full py-3 font-bold rounded-md ${
              isFormValid()
                ? "bg-[#F9CA4F] hover:bg-[#f8c238]"
                : "cursor-not-allowed bg-[#fadc8d]"
            }`}
            disabled={!isFormValid() || loading}
            onClick={handlePurchase}
          >
            {loading ? <Spinner /> : "Complete Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
