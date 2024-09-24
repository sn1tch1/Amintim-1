import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import BaseURL from "../../utils/BaseURL";
import avatar from "../../assets/avatar.png";
import coverAvatar from "../../assets/cover.png";
import { Spinner } from "@chakra-ui/react";

const AdminMemorialView = () => {
  const { id } = useParams();
  const [memorialData, setMemorialData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMemorialData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BaseURL}/memorial/${id}`);
        setMemorialData(response.data);
      } catch (error) {
        console.error("Error fetching memorial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemorialData();
  }, [id]);

  if (loading || !memorialData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  const formattedBirthDate = format(
    new Date(memorialData.birthDate),
    "dd MMMM yyyy"
  );
  const formattedDeathDate = format(
    new Date(memorialData.deathDate),
    "dd MMMM yyyy"
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="relative bg-white">
        <div className="relative">
          <img
            src={memorialData.coverImage || coverAvatar}
            alt="Cover"
            className="w-full h-[220px] object-cover"
          />
        </div>

        <div className="relative flex justify-center -mt-16">
          <div className="relative">
            <img
              src={memorialData.profileImage || avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full bg-white border-4 border-white object-cover"
            />
          </div>
        </div>

        <div className="text-center mt-2 space-y-2">
          <h2 className="text-xl font-bold">
            {memorialData.firstName} {memorialData.middleName}{" "}
            {memorialData.lastName}
          </h2>

          <div className="flex gap-6 items-center justify-center">
            <p className="text-gray-600 flex gap-3 items-center justify-center font-bold">
              Birth: {formattedBirthDate}
            </p>
            <p className="text-gray-600 flex gap-3 items-center justify-center font-bold">
              Death: {formattedDeathDate}
            </p>
          </div>

          <p className="text-gray-600">
            {memorialData.about || "No about information."}
          </p>
          <p className="text-gray-600">
            {memorialData.note || "No note available."}
          </p>
        </div>

        <div className="mt-6 p-4">
          <h3 className="text-lg font-bold mb-2">Tributes</h3>
          {memorialData.tributes?.length > 0 ? (
            <div className="space-y-4">
              {memorialData.tributes.map((tribute) => (
                <div
                  key={tribute._id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <p>{tribute.message}</p>
                  <small>
                    {format(new Date(tribute.createdAt), "dd MMM yyyy")}
                  </small>
                </div>
              ))}
            </div>
          ) : (
            <p>No tributes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMemorialView;
