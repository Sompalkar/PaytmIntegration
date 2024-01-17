import React, { useState } from "react";
import { CheckoutProvider, Checkout } from "paytm-blink-checkout-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    name: "",
    mobile: "",
    email: "",
    amount: "",
  });
  const [config, setConfig] = useState(null);

  const appendConfig = (config) => {
    const newConfig = { ...config };
    newConfig.handler = {
      notifyMerchant: notifyMerchantHandler,
      transactionStatus: transactionStatusHandler,
    };
    return newConfig;
  };

  const notifyMerchantHandler = () => {
    // Handle merchant notifications if needed
  };

  const transactionStatusHandler = (paymentStatus) => {
    console.log("Line 31:-- ", paymentStatus);
    console.log("Line 31:-- ", paymentStatus.ORDERID);

    if (paymentStatus.STATUS === "TXN_SUCCESS") { 


      updateTransactionStatus(paymentStatus.ORDERID, "SUCCESS");  

      navigate("/success");

    } else if (
      paymentStatus.STATUS === "TXN_FAILURE" ||
      paymentStatus.STATUS === "PENDING"
    ) {
      updateTransactionStatus(paymentStatus.ORDERID, "FAILURE");

      navigate("/failure");
    }

    document.getElementById("paytm-checkoutjs").remove();
  };

  const updateTransactionStatus = async (orderId, status) => {
    try {
      await axios.post("/updateStatus", {
        orderId,
        status,
      });
    } catch (error) {
      console.error("Error updating transaction status:", error);
      throw new Error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/payment",
        postData
      );

      
      setConfig(appendConfig(response.data));
 

      setPostData({ name: "", mobile: "", email: "", amount: "" });


    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <h3 className="text-xl mb-4 text-center font-bold text-blue-500">
          PaytmJS Checkout Demo
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              required
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={postData.name}
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              required
              placeholder="Mobile"
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={postData.mobile}
              onChange={(e) =>
                setPostData({ ...postData, mobile: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              required
              placeholder="Email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={postData.email}
              onChange={(e) =>
                setPostData({ ...postData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={postData.amount}
              onChange={(e) =>
                setPostData({ ...postData, amount: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>

        {config && (
          <CheckoutProvider config={config} openInPopup={true} env="STAGE">
            <Checkout />
          </CheckoutProvider>
        )}
      </div>
    </div>
  );
}

export default Payment;
