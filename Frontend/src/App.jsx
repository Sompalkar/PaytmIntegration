import React from "react";
import { Route, Routes } from "react-router-dom";
import Payment from "./Payment";
import Success from "./Success";
import Failure from "./Failure";
import "./index.css";
import Navbar from "./Navbar";
import History from "./History";

function App() {
  return (
    <div className="h-screen ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
