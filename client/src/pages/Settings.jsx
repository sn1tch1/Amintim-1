import React, { useState } from "react";
import SettingsTab from "../components/Settings";
import SoulStarsTab from "../components/Soulstar";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("SoulStars");
  const [avatar, setAvatar] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[100px] min-h-screen bg-white">
      <div className="w-full px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">Manage</h2>
        <p className="text-gray-600 mb-4 text-center">
          Set up your account and manage your information.
        </p>
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => handleTabClick("SoulStars")}
            className={`flex-grow p-3 text-center ${
              activeTab === "SoulStars"
                ? "bg-black text-white rounded-full"
                : "border-2 border-gray-300 text-gray-500 rounded-full"
            }`}
          >
            Soul Stars
          </button>
          <button
            onClick={() => handleTabClick("Settings")}
            className={`flex-grow p-3 text-center ${
              activeTab === "Settings"
                ? "bg-black text-white rounded-full"
                : "border-2 border-gray-300 text-gray-500 rounded-full"
            }`}
          >
            Settings
          </button>
        </div>
        {activeTab === "SoulStars" ? (
          <SoulStarsTab />
        ) : (
          <SettingsTab
            avatar={avatar}
            handleAvatarChange={handleAvatarChange}
          />
        )}
      </div>
    </div>
  );
};

// const SoulStarsTab = () => {
//   return (
//     <div className="flex flex-col items-center">
//       <p className="text-xl text-center">No Soul Star created</p>
//       <button className="mt-4 px-4 py-2 bg-black text-white rounded-full">
//         Create new
//       </button>
//     </div>
//   );
// };

// const SettingsTab = ({ avatar, handleAvatarChange }) => {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex justify-center mb-8">
//         <div className="relative">
//           <input
//             type="file"
//             accept="image/*"
//             id="avatar-upload"
//             onChange={handleAvatarChange}
//             className="hidden"
//           />
//           <label htmlFor="avatar-upload">
//             <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer">
//               {avatar ? (
//                 <img
//                   src={avatar}
//                   alt="Avatar"
//                   className="w-24 h-24 rounded-full"
//                 />
//               ) : (
//                 <span className="text-4xl font-bold text-gray-500">H</span>
//               )}
//             </div>
//           </label>
//           <button className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 text-gray-600"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15.232 5.232l3.536 3.536M14.828 8.828l3.536-3.536m-5.364 9.9a9 9 0 11-12.728-12.728l2.586 2.586a1 1 0 001.414 0l2.828-2.828a1 1 0 010 1.414L2.828 6.343a9 9 0 0112.728 12.728z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//       <form className="space-y-4 w-full max-w-md">
//         <div>
//           <label className="block text-gray-700">First Name</label>
//           <input
//             type="text"
//             className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
//             defaultValue="Hiii"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Last Name</label>
//           <input
//             type="text"
//             className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
//             placeholder="Last Name"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">City</label>
//           <input
//             type="text"
//             className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
//             placeholder="City"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Country</label>
//           <input
//             type="text"
//             className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
//             placeholder="Country"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Zip/Postal Code</label>
//           <input
//             type="text"
//             className="w-full p-3 border bg-gray-100 border-gray-300 rounded"
//             placeholder="Zip/Postal Code"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Language</label>
//           <select className="w-full p-3 border bg-gray-100 border-gray-300 rounded">
//             <option>Select</option>
//             {/* Add more options here */}
//           </select>
//         </div>
//       </form>
//     </div>
//   );
// };

export default SettingsPage;
