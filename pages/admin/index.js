import React, { useState, useEffect } from "react";
import Router from "next/router";
import checkLog from "../../auth/checkLog";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import Link from "next/link";
import EventBox from "./EventBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function index() {
  // check Auth

  const [isload, setIsload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState([]);

  const [active, setActive] = useState([]);

  useEffect(() => {
    if (!checkLog()) {
      setIsload(true);
      Router.push("/login");
    } else {
      setIsload(false);
    }
  }, [isload]);

  const getEvent = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.URL}/api/events`);
      setIsLoading(false);
      const reversedItems = res.data.map((item) => item).reverse();
      setEvent(reversedItems);
    } catch (err) {
      console.log(err);
    }
  };

  const notify = () =>
    toast.success("บันทึกข้อมูลสำเร็จ!", {
      theme: "colored",
      position: "top-center",
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const eventSet = () => {
    const data = event.map((item) => item.isActive);
    setActive(data);
  };
  const callback = (index, boolean) => {
    const data = event;
    const temp = data.map((element) => {
      return { ...element, isActive: false };
    });
    temp[index].isActive = boolean;
    setEvent(temp);
    notify();
  };
  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    eventSet();
  }, [event]);
  const menuList = [
    { text: "หน้าแรก", link: "admin/" },
    { text: "เพิ่มกิจกรรม", link: "admin/eventControl" },
    { text: "รายงาน", link: "admin/report" },
  ];
  if (isload) {
    return (
      <div className="container login">
        <div className="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="shadow">
            <Menu name="เมนูหลัก" items={menuList} />
          </div>
        </div>
        <div className="col ">
          <div className="shadow">
            <div className="card-header bg-secondary">
              <span className="text-white">รายการกิจกรรมทั้งหมด</span>
            </div>
            {isLoading ? (
              <div className="card-body">
                <div class="text-center my-3 ">
                  <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <p className="ml-1 mb-0">กำลังโหลดข้อมูล...</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3">
                <div class="row">
                  {event.length < 1 && (
                    <div
                      class="alert alert-warning  mx-auto col-10 text-center"
                      role="alert"
                    >
                      ยังไม่มีรายการกิจกรรมในขณะนี้{" "}
                      <Link href="admin/eventControl">
                        <a class="alert-link">เพิ่มกิจกรรม</a>
                      </Link>
                    </div>
                  )}

                  {event.map((item, index) => (
                    <EventBox
                      date={item.date}
                      id={item._id}
                      callback={callback}
                      index={index}
                      isActive={active[index]}
                    />
                  ))}

                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
