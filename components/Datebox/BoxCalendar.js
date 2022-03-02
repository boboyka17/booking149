import React from "react";

export default function BoxCalendar({ day, isset, empty, active }) {
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
            <h1>{empty}</h1>
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
