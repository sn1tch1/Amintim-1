import React, { useEffect, useState } from "react";
import BASE_URL from "../utils/BaseURL";
import { toast } from "react-hot-toast";
import axios from "axios";

const Referrals = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in cookies");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(`${BASE_URL}/users`, { headers });

      // Filter only partners
      const partnersData = res.data.filter((user) => user.role === "partner");
      console.log("hahah", partnersData);
      setPartners(partnersData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-semibold text-center">
        Partners & Referrals
      </h1>
      <h5 className="text-lg text-center mt-3">All Partners</h5>
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 text-center">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Referral Code</th>
              <th className="py-2 px-4">Referrals Used</th>
              <th className="py-2 px-4">Referred Users</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  Loading.......
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              partners?.map((partner, index) => (
                <tr key={partner._id} className="border-b">
                  <th scope="row" className="text-center py-2 px-4">
                    {index + 1}
                  </th>
                  <td className="py-2 px-4">{partner?.email}</td>

                  <td className="py-2 px-4">{partner.referralCode || "N/A"}</td>
                  <td className="py-2 px-4">
                    {partner.referralCodeUsedBy.length || 0}
                  </td>
                  <td className="py-2 px-4">
                    <ul className="list-disc pl-5">
                      {partner.referralCodeUsedBy.length > 0 ? (
                        partner.referralCodeUsedBy.map((refUser) => (
                          <li key={refUser._id}>{refUser.email}</li>
                        ))
                      ) : (
                        <li>No referrals</li>
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Referrals;
