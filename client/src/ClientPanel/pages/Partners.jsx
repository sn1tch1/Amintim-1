import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../utils/BaseURL"; // Adjust the BASE_URL import accordingly
import { LuClipboard } from "react-icons/lu";

const ReferralsPage = () => {
  const [referrals, setReferrals] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(`${BASE_URL}/users/partners`, {
        headers,
      });

      setReferrals(res?.data?.referralCodeUsedBy || []);
      console.log("hayee", res);
      setReferralCode(res?.data?.referralCode || ""); // Assuming the API returns the referral code as well
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch referrals");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4 mt-[80px] min-h-[600px]">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Referrals
      </h1>

      {/* Referral Code Section */}
      <div className="flex justify-center items-center mb-10">
        <div
          className="bg-gradient-to-r text-center relative
       from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-lg shadow-lg"
        >
          {referralCode && (
            <button
              className=" absolute top-2 right-2 bg-white text-indigo-600 font-semibold p-1  rounded-md hover:bg-gray-100 transition"
              onClick={() => {
                navigator.clipboard.writeText(referralCode);
                toast.success("Referral code copied to clipboard!");
              }}
            >
              <LuClipboard size={20} />
            </button>
          )}
          <h2 className="text-xl font-semibold mx-5">Your Referral Code</h2>
          <p className="text-2xl mt-2 font-bold tracking-wide">
            {referralCode || "N/A"}
          </p>
          {/* Copy to Clipboard Button */}
        </div>
      </div>

      <h5 className="text-lg text-center mb-8 text-gray-600">
        List of Users who signed up using your Referral Code.
      </h5>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && referrals?.length > 0 && (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 ">#</th>
                <th className="py-2 px-4 text-start">Referred User Name</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <th scope="row" className="text-center py-2 px-4">
                    {index + 1}
                  </th>
                  <td className="py-2 px-4">
                    {`${user?.firstName || "-"} ${user?.lastName || "-"}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && referrals.length === 0 && (
        <div className="text-center py-4 text-gray-600">No referrals found</div>
      )}
    </div>
  );
};

export default ReferralsPage;
