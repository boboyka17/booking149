/* eslint-disable-line */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Calendar from "../../components/Calendar/Calendar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import checkLog from "../../auth/checkLog";
import Link from "next/link";
const eventList = (event) => {
  {
    event.map((item, index) => {
      return (
        <div class="card">
          <nav
            class="navbar d-flex justify-content-between text-white"
            data-toggle="collapse"
            data-target={`#collapse_${index}`}
            aria-expanded="true"
            aria-controls="collapseOne"
            role="button"
            style={{ backgroundColor: item.color }}
          >
            <h4>{item.title}</h4>
            <span className="box-color"></span>
          </nav>

          <div
            id={`collapse_${index}`}
            class="collapse"
            data-parent="#accordionExample"
          >
            <div class="card-body">
              <ul class="list-group list-group-flush">
                {item.eventDays.map((child) => {
                  return <li class="list-group-item">{thDate(child)}</li>;
                })}
              </ul>
              <div className="text-center">
                <button
                  className=" btn btn-danger mt-3"
                  onClick={() => {
                    handleDelete(item._id, index, item.title);
                  }}
                >
                  ลบกิจกรรม
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
};

export default function eventControl() {
  // init Construct
  const router = useRouter();
  const MySwal = withReactContent(Swal);
  const dt = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // init State
  const [monthTxt, setMonthTxt] = useState(
    dt.toLocaleDateString("en-us", { month: "long" })
  );

  const getEvent = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${process.env.URL}/api/events`);
      setIsLoading(false);
      setEvent(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEvent = async (payload) => {
    try {
      setIsAdd(true);
      const res = await axios({
        method: "POST",
        url: `${process.env.URL}/api/events`,
        data: payload,
      });
      setEvent((item) => [...item, res.data]);
      setIsAdd(false);
      // useEffect();
    } catch (error) {
      console.error(error);
    }
  };

  const delEvent = async (id) => {
    try {
      await axios.delete(`${process.env.URL}/api/events/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  // event state
  const [event, setEvent] = useState([]);
  const [eventDays, setEventDays] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState(dt.getFullYear());
  const [nav, setNav] = useState(0);
  const [dayInMonth, setDayInMonth] = useState();
  // statePadding Days
  const [paddingDays, setPaddingDays] = useState();
  const [eventColor, setEventColor] = useState();
  const [togle, setTogle] = useState(false);
  useEffect(
    () => {
      dt.setMonth(new Date().getMonth() + nav);
      setMonthTxt(dt.toLocaleDateString("th-TH", { month: "long" }));
      setYear(dt.getFullYear());
      setDayInMonth(new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate());
      setMonth(dt.getMonth());
      // padding section
      const firstDayOfMonth = new Date(dt.getFullYear(), dt.getMonth(), 1);
      const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
      setPaddingDays(paddingDays);
    },
    [nav],
    [event]
  );
  useEffect(() => {
    getEvent();
  }, []);
  const color = [
    "#16a085",
    "#005C9F",
    "#9b59b6",
    "#e67e22",
    "#e74c3c",
    "#2c3e50",
  ];

  const handleDelete = (id, index, titleText) => {
    MySwal.fire({
      icon: "warning",
      title: `คุณแน่ใจไหมที่จะลบกิจกรรม ${titleText}`,
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("ลบข้อมูลสำเร็จ", "", "success");
        setEvent([...event.slice(0, index), ...event.slice(index + 1)]);
        delEvent(id);
      }
    });
  };

  const thDate = (date) => {
    const dt = new Date(date);
    const result = dt.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return result;
  };

  const validationSchema = Yup.object().shape({
    titleName: Yup.string().required("กรุณาป้อนชื่อกิจกรรม"),
  });
  const formik = useFormik({
    initialValues: {
      titleName: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data, { resetForm }) => {
      if (eventDays != "") {
        if (eventColor !== undefined) {
          let temp = {
            title: data.titleName,
            eventDays: eventDays,
            color: eventColor,
          };

          setTogle(true);
          setEventColor(undefined);
          addEvent(temp);
          resetForm({ data: "" });
        } else {
          let temp = {
            title: data.titleName,
            eventDays: eventDays,
            color: color[Math.floor(Math.random() * color.length)],
          };
          setTogle(true);
          setEventColor(undefined);
          addEvent(temp);
          resetForm({ data: "" });
        }
      } else {
        MySwal.fire({
          icon: "warning",
          title: "ไม่สามารถเพิ่มกิจกรรมได้",
          text: "กรุณาเลือกวันที่ต้องการก่อนทำการเพิ่มกิจกรรม",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6",
        });
      }
    },
  });
  // const styles = (theme) => {
  //   return {
  //     container,
  //   };
  // };
  // if (!checkLog()) {
  //   return (
  //     <div className="container login">
  //       <Login />
  //     </div>
  //   );
  // }
  // const isLogin = checkLog();
  const [isload, setIsload] = useState(false);
  useEffect(() => {
    if (!checkLog()) {
      setIsload(false);
      Router.push("/login");
    } else {
      setIsload(true);
    }
  }, [isload]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  return (
    <>
      {isload ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex justify-content-between">
                <div className="text-left mb-3 mt-3">
                  <Link href="/admin">
                    <a className="link text-primary">
                      <strong>หน้าแรก</strong>
                    </a>
                  </Link>
                </div>
                <div className="text-right mb-3 mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setNav(0);
                    }}
                  >
                    วันนี้
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <nav class="navbar navbar-dark text-white justify-content-center bg-dark h3">
                รายการกิจกรรม
              </nav>

              <div className="text-center mb-3">
                <div className="text-left form-group">
                  <label>สี</label>
                  <div className="color mb-3">
                    {color.map((item) => (
                      <button
                        className="btn"
                        data-color={item}
                        style={{ background: item, height: "2em" }}
                        onClick={(e) => {
                          let thisColor = e.target.getAttribute("data-color");
                          setEventColor(thisColor);
                        }}
                      ></button>
                    ))}
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label>ชื่อกิจกรรม</label>
                      <input
                        onChange={formik.handleChange}
                        type="text"
                        name="titleName"
                        className={`form-control mb-3 ${
                          formik.errors.titleName && `is-invalid`
                        }`}
                        value={formik.values.titleName}
                      />
                      <div className="invalid-feedback">
                        {formik.errors.titleName
                          ? formik.errors.titleName
                          : null}
                      </div>
                    </div>
                    {isAdd ? (
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled
                      >
                        <span
                          class="spinner-border spinner-border-sm mr-1"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        กำลังเพิ่มกิจกรรม...
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-success">
                        เพิ่มกิจกรรม
                      </button>
                    )}
                  </form>
                </div>
              </div>
              <hr />
              {!isLoading ? (
                <div class="accordion" id="accordionExample">
                  {event.map((item, index) => {
                    return (
                      <div class="card">
                        <nav
                          class="navbar d-flex justify-content-between text-white"
                          data-toggle="collapse"
                          data-target={`#collapse_${index}`}
                          aria-expanded="true"
                          aria-controls="collapseOne"
                          role="button"
                          style={{ backgroundColor: item.color }}
                        >
                          <h4>{item.title}</h4>
                          <span className="box-color"></span>
                        </nav>

                        <div
                          id={`collapse_${index}`}
                          class="collapse"
                          data-parent="#accordionExample"
                        >
                          <div class="card-body">
                            <ul class="list-group list-group-flush">
                              {item.eventDays.map((child) => {
                                return (
                                  <li class="list-group-item">
                                    {thDate(child)}
                                  </li>
                                );
                              })}
                            </ul>
                            <div className="text-center">
                              <button
                                className=" btn btn-danger mt-3"
                                onClick={() => {
                                  handleDelete(item._id, index, item.title);
                                }}
                              >
                                ลบกิจกรรม
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div class="text-center ">
                  <div class="d-flex justify-content-center align-items-center ">
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                    <p className="ml-1 mb-0">กำลังโหลดข้อมูล...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-8">
              <div class="d-flex justify-content-center align-items-center Ctitle">
                <a
                  className="btn"
                  onClick={() => {
                    setNav(nav - 1);
                  }}
                >
                  <i class="fa-solid fa-angle-left text-white pr-5"></i>
                </a>
                <span className="monthTitle">
                  {monthTxt + " " + parseInt(year + 543)}
                </span>
                <a
                  className="btn"
                  onClick={() => {
                    setNav(nav + 1);
                  }}
                >
                  <i class="fa-solid fa-angle-right text-white pl-5"></i>
                </a>
              </div>
              <Calendar
                padDays={paddingDays}
                totalDays={dayInMonth}
                currentDay={dt.getDate()}
                currentMonth={dt.getMonth()}
                Month={month}
                year={year}
                event={event}
                color={eventColor}
                setEventDays={setEventDays}
                togle={togle}
                setTogle={setTogle}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container login">
          <div className="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden"></span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
