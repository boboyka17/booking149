import React, { useEffect } from "react";
import Router from "next/router";
import Timebox from "../../components/Timebox/Timebox";
export default function index() {
  const goBack = () => {
    localStorage.removeItem("bookingID");
    Router.back();
  };
  useEffect(() => {
    const TimeId = localStorage.getItem("TimeID");
    console.log(TimeId);
    if (TimeId != null) {
      console.log(true);
      Router.push("/Result");
    }
  }, []);
  return (
    <div className="container pt-5">
      <nav className="nav">
        <div className="nav-link active">
          <button onClick={goBack} className="mb-3 btn btn-dark btn-sm">
            ย้อนกลับ
          </button>
        </div>
      </nav>
      <h1 class="text-center">เลือกช่วงเวลาสำหรับจองคิวทำสัญญา</h1>

      <Timebox />
    </div>
  );
}
