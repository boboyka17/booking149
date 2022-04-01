import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import thDate from "../../helper/thDate";
import Router from "next/router";

const ButtonGroup = ({}) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      {toggle ? (
        <div className="row">
          <a class="link text-success" href="#">
            บันทึก
          </a>
        </div>
      ) : (
        <div>
          <a class="link text-primary" href="#">
            แก้ไข
          </a>
        </div>
      )}
    </div>
  );
};

const TextData = ({ label, text }) => {
  return (
    <div class="form-group row">
      <label
        for="staticEmail"
        class="col-sm-4 col-form-label rounded text-light"
        style={{ background: "#2778c4" }}
      >
        <strong>{label}</strong>
      </label>
      <div class="col-sm-8">
        <span class="form-control-plaintext pl-2"> : {text}</span>
      </div>
    </div>
  );
};

const DateBox = ({ title }) => {
  return (
    <div className="mb-3">
      <div className="card-body bg-primary">
        <h2 style={{ fontWeight: "bold" }} className="text-light text-center">
          วันที่จอง
        </h2>
        <h1 style={{ fontWeight: "bold" }} className="text-light text-center">
          {title}
        </h1>
      </div>
    </div>
  );
};
const TimeBox = ({ title }) => {
  return (
    <div className="mb-3">
      <div className="mb-3">
        <div className="card-body bg-dark">
          <h2 style={{ fontWeight: "bold" }} className="text-light text-center">
            เวลาที่จอง
          </h2>
          <h1 style={{ fontWeight: "bold" }} className="text-light text-center">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default function index() {
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [timeDate, setTimeDate] = useState(null);

  const getBook = async (bookingID) => {
    try {
      const { data } = await axios.get(
        `${process.env.URL}/api/booking/${bookingID}`
      );
      setDate(data);
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  };

  const getTime = (TimeID) => {
    if (date != null) {
      const result = date.Booking.find((elm) => elm._id == TimeID);
      setTimeDate(result.time);
    }
  };

  async function getTimeID(idCard) {
    try {
      const { data } = await axios.get(
        `${process.env.URL}/api/booking/idCard/${idCard}`
      );
      return data.TimeId;
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  }
  async function getBookingID(idCard) {
    try {
      const { data } = await axios.get(
        `${process.env.URL}/api/booking/idCard/${idCard}`
      );
      return data.BookingID;
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  }

  const handleClick = () => {
    Router.push("/");
  };

  useEffect(async () => {
    const localData = localStorage.getItem("bookingData");
    const obj = eval("(" + localData + ")");
    let bookingID = localStorage.getItem("bookingID");
    if (obj != null) {
      setData(obj.payload);
    }
    if (bookingID == null) {
      bookingID = await getBookingID(obj.payload.idCard);
    }
    getBook(bookingID);
  }, []);

  useEffect(async () => {
    let TimeID = localStorage.getItem("TimeID");
    if (TimeID == null) {
      TimeID = await getTimeID(data.idCard);
    }
    getTime(TimeID);
  }, [date]);
  return (
    <div className="container">
      <div class="alert alert-success text-center" role="alert">
        <h5 className="mb-0">
          <strong>
            <i class="fa-solid fa-circle-check mr-2"></i>จองคิวสำเร็จ
          </strong>
        </h5>
      </div>
      <div
        class="card"
        style={{
          boxShadow: "0px 0px 10px 2px rgb(0 0 0 / 12%)",
          border: "none",
        }}
      >
        <div class="card-body">
          <div className="text-center mb-3">
            <h1 className="mb-0 text-primary">
              <strong>ผลการจอง</strong>
            </h1>
            <hr />
          </div>
          <div className="row px-3">
            <div className="col-sm-7 ">
              <TextData
                label="ประเภท"
                text={
                  data.Type != null && data.Type == "A"
                    ? "ผู้พิการ"
                    : "ผู่ดูแลผู้พิการ"
                }
              />
              <TextData
                label="เลขบัตรประชาชน"
                text={data.idCard != null && data.idCard}
              />
              <TextData
                label="ชื่อ-สกุล ผู้พิการ"
                text={
                  data.FirstName != null
                    ? data.FirstName + " " + data.LastName
                    : "-"
                }
              />
              <TextData
                label="ชื่อ-สกุล ผู้ดูแลคนพิการ"
                text={
                  data.FirstNameN != null
                    ? data.FirstNameN + " " + data.LastNameN
                    : "-"
                }
              />
              <TextData
                label="เบอร์โทรศัพท์"
                text={data.Phone != null && data.Phone}
              />
              <TextData label="เพศ" text={data.Gender != null && data.Gender} />

              <ButtonGroup />
            </div>
            <div className="col-sm-5">
              <div className="d-flex flex-column">
                <DateBox title={date && thDate(date.dateTitle).date} />
                <TimeBox title={timeDate} />
              </div>
            </div>
            <div className="mx-auto">
              <button className="btn btn-secondary" onClick={handleClick}>
                กลับสู่หน้าหลัก
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
