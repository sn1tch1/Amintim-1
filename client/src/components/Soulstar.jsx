import { Link } from "react-router-dom";

const SoulStarsTab = () => {
  return (
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
  );
};

export default SoulStarsTab;
