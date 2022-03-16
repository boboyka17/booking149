import React, { useState, useEffect } from "react";
import Router from "next/router";
import checkLog from "../../auth/checkLog";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import Link from "next/link";
export default function index() {
  // check Auth
  const [isload, setIsload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState([]);
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
  const thDate = (date) => {
    const dt = new Date(date);
    const resultDate = dt.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const resultTime = dt.toLocaleTimeString("th-TH");

    return resultDate + " " + resultTime + " น.";
  };

  useEffect(() => {
    getEvent();
  }, []);
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
                    // <div className="row mx-1 mt-3 text-center">
                    //   <div
                    //     className="col-6 text-white"
                    //     style={{
                    //       backgroundColor: "#F64C72",
                    //       fontSize: "1.25rem",
                    //       fontWeight: "bold",
                    //     }}
                    //   >
                    //     <p className="mb-0">จองแล้ว</p>
                    //     <h1>1</h1>
                    //   </div>
                    //   <div
                    //     className="col-6 text-white"
                    //     style={{
                    //       backgroundColor: "#5CDB95",
                    //       fontSize: "1.25rem",
                    //       fontWeight: "bold",
                    //     }}
                    //   >
                    //     <p className="mb-0">ว่าง</p>
                    //     <h1>1</h1>
                    //   </div>
                    // </div>
                    <div class="col-sm-6 col-md-6 mb-3">
                      <div id={index} class="card">
                        <div className="card-header text-white bg-dark">
                          <h5 class="card-title text-center mb-0">
                            {item.title}
                          </h5>
                        </div>
                        <div class="card-body">
                          <p className="d-flex justify-content-end align-items-center">
                            {item.isActive ? (
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
                            จำนวน {item.eventDays.length} วัน
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
                          {/* <div>
                            <p>
                              <strong>
                                วันที่เปิดให้จอง :{" "}
                                <span class="badge badge-primary badge-pill">
                                  {item.eventDays.length}
                                </span>{" "}
                                วัน
                              </strong>
                            </p>
                            <p>
                              <strong>
                                จองแล้ว :{" "}
                                <span class="badge badge-success badge-pill">
                                  {item.eventDays.length}
                                </span>
                              </strong>
                            </p>
                            <p>
                              <strong>
                                ว่าง :{" "}
                                <span class="badge badge-danger badge-pill">
                                  {item.eventDays.length}
                                </span>
                              </strong>
                            </p>
                            <p>
                              <strong>
                                สถานะ :{" "}
                                <span class="badge badge-success badge-pill">
                                  เปิดใช้งาน
                                </span>
                              </strong>
                            </p>
                          </div> */}
                          <div className="text-center">
                            <a href="#" class="btn ">
                              ดูรายละเอียด
                            </a>
                          </div>
                        </div>
                        <div class="card-footer text-muted">
                          {thDate(item.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
