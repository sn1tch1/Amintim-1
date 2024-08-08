import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import avatar from "../assets/avatar.png";
import BaseURL, { IMAGES_BASE_URL } from "../utils/BaseURL";

const SoulStarsTab = () => {
  const [memorialPages, setMemorialPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemorialPages = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${BaseURL}/memorial/user/66ab9b2a413797d85938774c`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          }
        );

        setMemorialPages(response.data);
      } catch (error) {
        console.error("Error fetching memorial pages:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemorialPages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      {memorialPages.length > 0 || memorialPages === null || undefined ? (
        <div className="flex flex-col items-center w-full">
          <p className="text-xl text-center font-[600]">Memorial Pages</p>
          <div className="mt-4 space-y-4 w-full">
            {memorialPages?.map((page) => {
              const formattedDeathDate = page.deathDate
                ? format(new Date(page.deathDate), "dd MMMM yyyy")
                : "";
              const profileImageSrc = page.profileImage
                ? `${page.profileImage}`
                : avatar;
              return (
                <div
                  key={page._id}
                  className="border flex justify-between items-center p-4 px-8 rounded-lg w-full shadow-md"
                >
                  <div className="flex gap-3 items-center justify-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden">
                      <img
                        src={profileImageSrc}
                        alt={`${page.firstName} ${page.lastName}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-md md:text-lg font-bold">
                        {page.firstName} {page.middleName}
                        <span className="hidden md:block">{page.lastName}</span>
                      </h2>
                      <h2 className="text-sm md:text-lg text-gray-800">
                        {formattedDeathDate}
                      </h2>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 md:gap-5">
                    <Link
                      to={`/profile/view/${page._id}`}
                      className="text-md md:text-lg font-bold underline text-green-800 underline-offset-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/memorial/profile/${page._id}`}
                      className="text-md md:text-lg font-bold underline text-blue-800 underline-offset-2"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-xl text-center font-[600]">
                No Soul Star <br /> created
              </p>
              <Link to="/qr/link">
                <button className="mt-4 px-8 py-2 bg-black/90 hover:bg-black duration-200 text-white rounded-full">
                  Create new
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-xl text-center font-[600]">
            No Soul Star <br /> created
          </p>
          <Link to="/qr/link">
            <button className="mt-4 px-8 py-2 bg-black/90 hover:bg-black duration-200 text-white rounded-full">
              Create new
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SoulStarsTab;
