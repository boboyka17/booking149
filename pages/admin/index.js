import React, { useState, useEffect } from "react";
import Router from "next/router";
import checkLog from "../../auth/checkLog";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
export default function index() {
  // check Auth
  const [isload, setIsload] = useState(false);
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
      const res = await axios.get("http://localhost:3001/api/events");
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

    return "วันที่ " + resultDate + " " + "เวลา " + resultTime + " น.";
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
            <div className="p-3">
              <div class="row">
                {event.map((item, index) => (
                  <div class="col-sm-6 mb-3">
                    <div id={index} class="card">
                      <div class="card-body">
                        <h5 class="card-title text-center">{item.title}</h5>
                        <div>
                          <table className="table">
                            <tr key="">
                              <th style={{ borderCollapse: "collapse" }}>
                                จำนวนวัน
                              </th>
                              <td>{item.eventDays.length} วัน</td>
                            </tr>
                          </table>
                          {/* <dl class="row">
                            <dt class="col-sm-4">จำนวนวัน:</dt>
                            <dd class="col-sm-8">
                              {item.eventDays.length} วัน
                            </dd>
                          </dl> */}
                          {/* <button
                            className="btn"
                            data-color={item}
                            style={{
                              background: item.color,
                              height: "3em",
                              width: "3em",
                            }}
                          ></button> */}
                        </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
