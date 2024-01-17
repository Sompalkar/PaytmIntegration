import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className=" flex items-center justify-center flex-col  h-full ">
      <div className="bg-green-500 text-white p-4 rounded-md  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mb-4 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-center font-bold text-lg">Payment Successful!</p>
        <p className="text-center text-blue-700 text-lg font-bold  ">
          <Link to="/" > back to home </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;
