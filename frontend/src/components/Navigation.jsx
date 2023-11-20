import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="max-w-7xl w-screen px-16 select-none">
      <h1 className="text-6xl font-light text-center mb-8">JANE DOE</h1>
      {/* Navigation bar */}
      <nav className="pl-4 pb-2 mb-8 uppercase border-solid border-b-[1.75px] border-gray-300 tracking-widest w-full">
        <div className="flex gap-8 items-center">
          <Link
            to={"/"}
            className="text-gray-900 px-4 p-2 rounded-md hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-gray-900 px-4 p-2 rounded-lg hover:bg-gray-200"
          >
            About
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
