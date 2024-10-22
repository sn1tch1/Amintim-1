import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Spinner } from "@chakra-ui/react";
import BaseURL from "../../utils/BaseURL";
import axios from "axios";

const Checkout = () => {
  const { calculateSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0); // Step 1: Add this line
  const [isReferralApplied, setIsReferralApplied] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    newsEmail: false,
  });
  const [deliveryInfo, setDeliveryInfo] = useState({
    country: "Romania",
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
      const existingItem = acc.find(
        (i) => i.id === item.id && i.type === item.type
      );
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

  useEffect(() => {
    setSubTotal(calculateSubtotal()); // Set subtotal when component mounts
  }, [cart]);

  useEffect(() => {
    const savedDiscount = localStorage.getItem("discountAmount");
    const referralApplied = localStorage.getItem("isReferralApplied");
    if (savedDiscount) {
      setDiscountAmount(savedDiscount);
      setSubTotal((prev) => prev - savedDiscount);
    }
    if (referralApplied === true) {
      setDiscountAmount(true);
    }
  }, []);

  // const SubTotal = calculateSubtotal().toFixed(2);
  // setSubTotal(SubTotal);

  const handlePurchase = async () => {
    const { email } = contactInfo;
    const { firstName, lastName, address, postalCode, city } = deliveryInfo;
    const { cardNumber, expiryDate, securityCode, cardHolderName } =
      paymentInfo;

    const missingFields = [];

    if (!email) missingFields.push("Email");
    if (!firstName) missingFields.push("Prenume");
    if (!address) missingFields.push("Adresa");
    if (!postalCode) missingFields.push("Cod Postal");
    if (!city) missingFields.push("Oras");
    if (!cardNumber) missingFields.push("Numar Card");
    if (!expiryDate) missingFields.push("Data expirare");
    if (!securityCode) missingFields.push("Cod Securitate");
    if (!cardHolderName) missingFields.push("Nume");

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        toast.error(`${field} is required.`);
      });
      return;
    } else {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      setLoading(true);

      try {
        const response = await fetch(`${BaseURL}/purchase/purchase`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
          credentials: "include", // Include credentials with the request
          body: JSON.stringify({
            deliveryInfo,
            items: groupedCart.map((item) => ({
              id: item.id,
              type: item.id, // Ensure type is included
              price: item.price,
              quantity: item.quantity,
            })),
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
        navigate("/congratulations");
        console.log("Purchase successful:", data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRedeemReferralCode = async () => {
    try {
      const response = await axios.post(`${BaseURL}/purchase/referral-code`, {
        referralCode,
      });

      if (response.status === 200) {
        const discount = response.data.discount; // Assuming the discount value is in percentage
        const newSubTotal = subTotal * (1 - discount / 100); // Calculate the new subtotal
        setSubTotal(newSubTotal);
        setDiscountAmount(subTotal - newSubTotal); // Step 3: Set the discount amount
        let saveDiscount = subTotal - newSubTotal;
        setIsReferralApplied(true);
        localStorage.setItem("discountAmount", saveDiscount);
        localStorage.setItem("isReferralApplied", isReferralApplied);
        toast.success(
          `Referral code redeemed! New subtotal: RON ${newSubTotal.toFixed(2)}`
        );
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Error redeeming referral code"
        );
      } else {
        toast.error("Error redeeming referral code");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md flex flex-col lg:flex-row">
      {!isLoggedIn && (
        <div className="fixed top-16 left-0 w-full bg-red-800 text-[12px] text-white text-center py-1 z-50">
          <p>You must be logged in to complete your purchase.</p>
        </div>
      )}
      <div className="w-full lg:w-3/5 px-4 py-6 lg:px-12 mt-[60px] lg:py-[100px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">
          Contact <span className="text-red-500">*</span>
        </h2>
        <div className="mb-6">
          <input
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
            type="email"
            id="email"
            value={contactInfo.email}
            onChange={(e) => handleInputChange(e, setContactInfo)}
            placeholder="Email sau numar de telefon"
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
              Primeste noutati pe email
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Livrare </h2>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-medium mb-2" htmlFor="countryRegion">
              Tara <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              id="country"
              value={deliveryInfo.country}
              onChange={(e) => handleInputChange(e, setDeliveryInfo)}
            >
              <option>Romania</option>
              <option>Ungaria</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="firstName">
                Prenume <span className="text-red-500">*</span>
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
                Nume
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
              Adresa <span className="text-red-500">*</span>
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
              Apartament, etaj, etc.
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
                Cod Postal <span className="text-red-500">*</span>
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
                Oras <span className="text-red-500">*</span>
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

        <h2 className="text-2xl font-bold mb-4">Plata</h2>
        <p className="mb-6">
          Toate tranzactiile sunt encriptate si securizate.
        </p>

        <div className="border p-4 rounded-lg mb-4 bg-gray-50">
          <div className="border-b pb-2 mb-4">
            <h3 className="text-xl font-semibold">Credit card</h3>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-2" htmlFor="cardNumber">
                Card number <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                id="cardNumber"
                type="number"
                value={paymentInfo.cardNumber}
                onChange={(e) => handleInputChange(e, setPaymentInfo)}
                placeholder="Card number"
              />
            </div>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <label className="block font-medium mb-2" htmlFor="expiryDate">
                  Valid until (MM / YY) <span className="text-red-500">*</span>
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
                  Security code <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full p-2 border border-gray-300 rounded-md"
                  id="securityCode"
                  type="number"
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
                Name of Cardholder <span className="text-red-500">*</span>
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

      {/* <div className="w-full lg:w-2/5 px-4 py-6 lg:px-12 lg:py-12 bg-gray-100">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Continut comanda</h2>
          <table className="w-full">
            <tbody>
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
                      <p className="text-gray-500">RON {item.price}</p>
                    </div>
                  </td>
                  <td className="py-4">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800 font-medium">RON {SubTotal}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Livrare</p>
            <p className="text-gray-800 font-medium">00.00</p>
          </div>
          <div className="flex justify-between font-bold items-center mb-6">
            <p className="text-gray-600">Total</p>
            <p className="text-gray-800 font-medium">RON {SubTotal}</p>
          </div>
          <button
            className={`w-full py-3 font-bold rounded-md ${
              loading === false
                ? "bg-[#F9CA4F] hover:bg-[#f8c238]"
                : "cursor-not-allowed bg-[#fadc8d]"
            }`}
            disabled={loading}
            onClick={handlePurchase}
          >
            {loading ? <Spinner /> : "Finalizeaza"}
          </button>
        </div>
      </div> */}
      <div className="w-full lg:w-2/5 px-4 py-6 lg:px-12 lg:py-12 bg-gray-100">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Continut comanda</h2>
          <table className="w-full">
            <tbody>
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
                      <p className="text-gray-500">RON {item.price}</p>
                    </div>
                  </td>
                  <td className="py-4">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800 font-medium">RON {subTotal}</p>
          </div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Livrare</p>
            <p className="text-gray-800 font-medium">RON {discountAmount}</p>
          </div>
          <div className="flex justify-between font-bold items-center mt-3 pt-3 border-t border-black mb-6">
            <p className="text-gray-600">Total</p>
            <p className="text-gray-800 font-bold">RON {subTotal}</p>
          </div>

          {/* Referral Code Input Section */}
          <div className="mb-6">
            <label htmlFor="referralCode" className="block text-gray-600 mb-2">
              Introdu codul de referință
            </label>
            <div className="flex">
              <input
                type="text"
                id="referralCode"
                className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#F9CA4F] focus:border-transparent"
                placeholder="Cod de referință"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
              />
              <button
                className={`ml-2 py-2 px-4 ${
                  isReferralApplied
                    ? "bg-[#c2c2c2] cursor-not-allowed"
                    : "bg-[#F9CA4F] hover:bg-[#f8c238] cursor-pointer"
                }  text-white rounded-md  focus:outline-none`}
                onClick={handleRedeemReferralCode}
                disabled={isReferralApplied}
              >
                Aplică
              </button>
            </div>
          </div>

          <button
            className={`w-full py-3 font-bold rounded-md ${
              loading === false
                ? "bg-[#F9CA4F] hover:bg-[#f8c238]"
                : "cursor-not-allowed bg-[#fadc8d]"
            }`}
            disabled={loading}
            onClick={handlePurchase}
          >
            {loading ? <Spinner /> : "Finalizeaza"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
