/* eslint-disable-line */
import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
export default function Calendar({
  padDays,
  totalDays,
  currentDay,
  currentMonth,
  Month,
  year,
  event,
  color,
  setEventDays,
  togle,
  setTogle,
}) {
  const [active, setActive] = useState([]);
  function today(fxCurrentDays) {
    let boolean = fxCurrentDays == currentDay && currentMonth == Month;
    return boolean;
  }

  function weekend(day, Month, year) {
    const weekend = ["Saturday", "Sunday"];
    let dt = new Date(year, Month, day + 1);
    let dateString = dt.toLocaleDateString("en-us", {
      weekday: "long",
    });
    let result = weekend.includes(dateString);
    return result;
    // return false;
  }

  useEffect(() => {
    // active.length > 0 ? isEvent(true) : isEvent(false);
    // params.setEventDays("test");
    if (togle) {
      setActive([]);
      setTogle(false);
    }
    // sort  array
    const arr_sort = active.sort((a, b) => Date.parse(a) - Date.parse(b));
    setEventDays(arr_sort);
    let divArr = [...document.querySelectorAll(".day, .currentDay")];
    // eventChildArrFX(active);
    divArr.map((item) => {
      item.classList.remove("eventPre");
      let data = item.dataset.date;
      let checkDate = active.includes(data);
      if (checkDate) {
        item.classList.add("eventPre");
      }
    });
    if (active != "") {
      if (color !== undefined) {
        document.getElementsByClassName("eventPre").backgroundColor = "red";
        console.log();
      } else {
        console.log("color not chang");
      }
    }
  }, [Month, active, color, togle]);

  function classNameCondition(todayJSX, isWeekend) {
    // console.log(first);

    // function dateCheck(thisDay) {
    //   const dt_1 = new Date(thisDay);
    //   // const boo = event.eventDays.map((i) => {
    //   //   const dt_2 = new Date(i);
    //   //   return +dt_1 === +dt_2;
    //   // });
    //   const boo = event.map((i) => {
    //     console.log(i);
    //   });
    //   return boo.includes(true);
    // }
    // let thisDay = year + "/" + parseInt(Month + 1) + "/" + todayJSX;
    // let eventBoo = dateCheck(thisDay);
    let boo = today(todayJSX);
    if (boo) {
      return "currentDay";
    } else if (isWeekend) {
      return "weekend";
    } else {
      return "day";
    }
  }
  const Padding = [...Array(padDays).keys()].map((elm) => (
    <div className="padding" value={elm}></div>
  ));
  const Weeks = ["อา", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."].map((elm) => (
    <div className="week">{elm}</div>
  ));

  const Days = [...Array(totalDays).keys()].map((elm, index) => {
    function dateCheck(thisDay) {
      const result = [];
      for (let i = 0; i < event.length; i++) {
        let data = {
          day: thisDay,
          title: event[i].title,
          color: event[i].color,
          booleen: event[i].eventDays.includes(thisDay),
        };
        result.push(data);
      }
      const booleanResult = result.find((member) => {
        return member.booleen;
      });
      return booleanResult;
    }

    let isWeekend = weekend(elm, Month, year);
    let clickDay = year + "/" + parseInt(Month + 1) + "/" + parseInt(elm + 1);
    let eventData = dateCheck(clickDay);

    // this function return color
    function styleFx(clickDay, eventData) {
      if (eventData) {
        return eventData.color;
      }
      if (color != undefined && active.includes(clickDay)) {
        return color;
      }
    }
    return (
      <div
        key={index}
        data-date={year + "/" + parseInt(Month + 1) + "/" + parseInt(elm + 1)}
        className={`${classNameCondition(elm + 1, isWeekend)}`}
        onClick={(e) => {
          if (!isWeekend && eventData == undefined) {
            if (active.includes(clickDay)) {
              setActive(active.filter((item) => item !== clickDay));
            } else {
              setActive((active) => [...active, clickDay]);
            }
            if (e.target.getAttribute("data-date") === clickDay) {
              e.target.classList.toggle("eventPre");
            }
          }
        }}
        style={{
          backgroundColor: eventData ? eventData.color : "",
          color: eventData ? "white" : "",
        }}
        style={{
          backgroundColor: styleFx(clickDay, eventData),
          color: eventData ? "white" : "",
        }}
      >
        <span>{elm + 1}</span>
      </div>
    );
  });
  return (
    <div>
      <div class="calendar">
        <div className="date-grid">
          {Weeks}
          {Padding}
          {Days}
        </div>
      </div>
    </div>
  );
}
