import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import thDate from "../../helper/thDate";
import Router from "next/router";
export default function BoxCalendar({ day, thisDate, id }) {
  const default_limit = 16;
  const [active, setActive] = useState(false);
  const [isset, setIsset] = useState(0);

  const handleClick = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: `คุณแน่ใจไหมที่จะเลือกจองวัน <br>${thDate(thisDate).date}`,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });
    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "เลือกวันสำเร็จ",
        confirmButtonText: "ยืนยัน",
      });
      localStorage.setItem("bookingID", id);
      Router.push("/Timepicker");
    }
  };

  const clean = (data) => {
    const num = 0;
    data.Booking.map((item) => {
      const temp = item.ref.length;
      num = num + temp;
    });
    return num;
  };

  const getBook = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.URL}/api/booking/${id}`);
      const newData = clean(data);
      setActive(false);
      if (newData < default_limit) {
        setActive(true);
      }
      setIsset(newData);
      // setData(Date(data[0], data[lenght]));
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  };
  useEffect(() => {
    getBook(id);
  }, [id]);
  return active ? (
    <div
      style={{ fontSize: "2em" }}
      className="col-12 col-sm-12 col-md-6 col-lg-4 mb-3"
    >
      <div className="card-body">
        <h1 style={{ fontWeight: "bold" }} className="text-primary text-center">
          วันที่ {day}
        </h1>
        <button
          className="btn btn-block text-white"
          style={{
            backgroundColor: "#2F2FA2",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
          onClick={handleClick}
        >
          จองคิว
        </button>
        <div className="row mx-1 mt-3 text-center">
          <div
            className="col-6 text-white"
            style={{
              backgroundColor: "#F64C72",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            <p className="mb-0">จองแล้ว</p>
            <h1>{isset}</h1>
          </div>
          <div
            className="col-6 text-white"
            style={{
              backgroundColor: "#5CDB95",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            <p className="mb-0">ว่าง</p>
            <h1>{default_limit - isset}</h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{ fontSize: "2em" }}
      className="col-12 col-sm-12 col-md-6 col-lg-4 mb-3"
    >
      <div className="card-body">
        <h1
          style={{ fontWeight: "bold", color: "#BBBBBB" }}
          className=" text-center"
        >
          วันที่ {day}
        </h1>

        <div className="row mx-1 mt-3 text-center">
          <div
            className="col-6 text-white"
            style={{
              backgroundColor: "#CCCCCC",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            <p className="mb-0">จองแล้ว</p>
            <h1>{isset}</h1>
          </div>
          <div
            className="col-6 text-white"
            style={{
              backgroundColor: "#DDDDDD",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            <p className="mb-0">ว่าง</p>
            <h1>-</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
