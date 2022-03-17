import React from "react";
import Switch from "react-switch";
import thDate from "../../helper/thDate";
import axios from "axios";

export default function EventBox({ date, id, callback, index, isActive }) {
  const handleChange = async (nextChecked, id) => {
    try {
      const payload = { isActive: nextChecked };
      await axios.patch(`${process.env.URL}/api/events/${id}`, payload);
      callback(index, nextChecked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="col-sm-6 col-md-6 mb-3">
      <div class="card">
        <div className="card-header text-white bg-dark">
          <h5 class="card-title text-center mb-0"></h5>
        </div>
        <div class="card-body">
          <p className="d-flex justify-content-between align-items-center">
            <div class="checkbox d-flex align-items-center">
              <Switch
                onChange={(e) => {
                  handleChange(e, id);
                }}
                checked={isActive}
                height={20}
                width={45}
                uncheckedIcon={false}
                checkedIcon={false}
                offColor="#dc3545"
                onColor="#198754"
              />
            </div>
            {isActive ? (
              <div className="d-flex justify-content-end align-items-center">
                <span className="cirle online mr-1"></span>
                เปิดใช้งาน
              </div>
            ) : (
              <div className="d-flex justify-content-end align-items-center">
                <span className="cirle offline mr-1"></span>
                ปิดใช้งาน
              </div>
            )}
          </p>
          <h1
            style={{ fontWeight: "bold" }}
            className="text-primary text-center"
          >
            จำนวน 1 วัน
          </h1>
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
              <h1>1</h1>
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
              <h1>1</h1>
            </div>
          </div>
          <div className="text-center">
            <a href="#" class="btn ">
              ดูรายละเอียด
            </a>
          </div>
        </div>
        <div class="card-footer text-muted">{thDate(date)}</div>
      </div>
    </div>
  );
}
