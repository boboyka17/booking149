import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
import { swap } from "formik";
export default function Timebox({ title, index }) {
  const [refData, setRefData] = useState(null);
  const morning = [
    "9:30 - 10:00 น.",
    "10:00 - 10:30 น.",
    "10:30 - 11:00 น.",
    "11:00 - 11:30 น.",
    "11:30 - 12:00 น.",
  ];
  const after = ["13:30 - 14:00 น.", "14:00 - 14:30 น.", "14:30 - 15:00 น."];

  const getBook = async (id) => {
    try {
      const { data } = await axios.get(`${process.env.URL}/api/booking/${id}`);
      setRefData(data.Booking);
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  };

  const postBook = async (dayId, timeId) => {
    const str = localStorage.getItem("bookingData");
    const obj = eval("(" + str + ")");
    const payload = {
      idCard: obj.payload.idCard,
    };
    try {
      await axios.patch(
        `${process.env.URL}/api/booking/${dayId}/${timeId}`,
        payload
      );
      localStorage.setItem("TimeID", timeId);
      Router.push("/Result");
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  };

  const handleClick = async (timeId, title) => {
    // Confirme here
    const dayid = localStorage.getItem("bookingID");
    const result = await Swal.fire({
      icon: "warning",
      title: `คุณแน่ใจไหมที่จะเลือกจองเวลา <br>${title}`,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    });
    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "เลือกเวลาสำเร็จ",
        confirmButtonText: "ยืนยัน",
      });
      postBook(dayid, timeId);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("bookingID");
    getBook(id);
  }, []);
  return (
    <div className="row g-2 mb-3 justify-content-center">
      <div className="col-12">
        <h2 class="box-head text-white text-center">
          <span>ช่วงเช้า</span>
        </h2>
      </div>
      {morning.map((item, index) => {
        let free = 2;
        let result;
        let book = 0;
        if (refData != null) {
          result = free - refData[index].ref.length;
          if (result == 0) result = "";
        }
        return (
          <div className="col-md-4 mb-3">
            <div
              class={`box-p position-relative ${
                result == 0 ? "box-disable" : ""
              }`}
              data-toggle="collapse"
              data-target={`#morning${index}${
                result == 0 ? "box-disable" : ""
              }`}
            >
              <span style={{ fontWeight: "bold" }}>{item} </span>

              <span class="badge bg-danger noti">{result}</span>
            </div>
            <div class="collapse mt-3" id={`morning${index}`}>
              <div class="card card-body">
                <ul class="list-group">
                  <li class="list-group-item">
                    <span
                      class="badge badge-primary"
                      style={{ fontSize: "18px" }}
                    >
                      สถานะ
                    </span>
                    <span style={{ fontSize: "18px" }}> : ว่าง</span>
                  </li>
                  <li class="list-group-item">
                    <span
                      class="badge text-white"
                      style={{ fontSize: "18px", background: "#f64c72" }}
                    >
                      จองแล้ว
                    </span>
                    <span style={{ fontSize: "18px" }}>
                      {" "}
                      : {free - result} รายการ
                    </span>
                  </li>
                  <li class="list-group-item">
                    <span
                      class="badge badge-success"
                      style={{ fontSize: "18px", background: "#5CDB95" }}
                    >
                      ว่าง
                    </span>
                    <span style={{ fontSize: "18px" }}> : {result} รายการ</span>
                  </li>
                </ul>
                <button
                  class="btn text-white"
                  style={{ fontSize: "18px", background: "#2F2FA2" }}
                  onClick={() => {
                    const id = refData[index]._id;
                    handleClick(id, item);
                  }}
                >
                  จอง
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="col-12">
        <h2 class="box-head text-white text-center">
          <span>ช่วงบ่าย</span>
        </h2>
      </div>
      {after.map((item, index) => {
        let default_index = 5;
        let free = 2;
        let result;
        if (refData != null) {
          result = free - refData[index + default_index].ref.length;
          if (result == 0) result = "";
        }
        return (
          <div className="col-md-4 mb-3">
            <div
              class={`box-s position-relative ${
                result == 0 ? "box-disable" : ""
              }`}
              data-toggle="collapse"
              data-target={`#after${index + default_index}${
                result == 0 ? "box-disable" : ""
              }`}
            >
              <span style={{ fontWeight: "bold" }}>{item} </span>
              <span class="badge bg-danger noti">{result}</span>
            </div>
            <div class="collapse mt-3" id={`after${index + default_index}`}>
              <div class="card card-body">
                <ul class="list-group">
                  <li class="list-group-item">
                    <span
                      class="badge badge-primary"
                      style={{ fontSize: "18px" }}
                    >
                      สถานะ
                    </span>
                    <span style={{ fontSize: "18px" }}> : ว่าง</span>
                  </li>
                  <li class="list-group-item">
                    <span
                      class="badge text-white"
                      style={{ fontSize: "18px", background: "#f64c72" }}
                    >
                      จองแล้ว
                    </span>
                    <span style={{ fontSize: "18px" }}>
                      {" "}
                      : {free - result} รายการ
                    </span>
                  </li>
                  <li class="list-group-item">
                    <span
                      class="badge badge-success"
                      style={{ fontSize: "18px", background: "#5CDB95" }}
                    >
                      ว่าง
                    </span>
                    <span style={{ fontSize: "18px" }}> : {result} รายการ</span>
                  </li>
                </ul>
                <button
                  class="btn text-white"
                  style={{ fontSize: "18px", background: "#2F2FA2" }}
                  onClick={() => {
                    const id = refData[index + default_index]._id;
                    handleClick(id, item);
                  }}
                >
                  จอง
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
