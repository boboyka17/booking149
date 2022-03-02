import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PaginatedItems from "../../components/Datebox/PaginatedItems";
import moment from "moment";
import "moment/locale/th";
const obj = {
  year: [
    {
      yearTitle: "1999",
      month: [
        {
          monthTitle: "3",
          days: [
            {
              daysTitle: "1",
            },
            {
              daysTitle: "2",
            },
            {
              daysTitle: "3",
            },
            {
              daysTitle: "4",
            },
          ],
        },
        {
          monthTitle: "4",
          days: [
            {
              daysTitle: "1",
            },
            {
              daysTitle: "2",
            },
            {
              daysTitle: "3",
            },
          ],
        },
      ],
    },
  ],
};

const Date = (first_date, second_date) => {
  // function

  function dayCount(val) {
    let result = moment(val, "MM").daysInMonth();
    return result;
  }

  // Contructor

  let month_first = 1 + moment(first_date, "DD/MM/YYYY").month();
  let month_end = 1 + moment(second_date, "DD/MM/YYYY").month();
  let year_first = moment(first_date, "DD/MM/YYYY").year();
  // let year_end = moment(second_date, "DD/MM/YYYY").year();

  if (month_first == month_end) {
    let first = moment(first_date, "DD/MM/YYYY").date();
    let last = moment(second_date, "DD/MM/YYYY").date();
    let days = [];
    for (let i = first; i <= last; i++) {
      days.push(i);
    }
    const json = [
      {
        days: days,
        mounth: month_first,
        year: year_first,
      },
    ];
  }

  if (month_end - month_first > 0) {
    let first = moment(first_date, "DD/MM/YYYY").date();
    let last = moment(second_date, "DD/MM/YYYY").date();
    let year = moment(second_date, "DD/MM/YYYY").year();
    let days = [];
    let month = [];
    let check = 0;
    let test = [];
    let lenghtCheck = month_end - month_first;
    for (let i = month_first; i <= month_end; i++) {
      let temp = {};
      if (check == 0) {
        for (let j = first; j <= dayCount(i); j++) {
          days.push({ dayTitle: j });
        }
      }
      if (check == 1 && check != lenghtCheck) {
        for (let j = 1; j <= dayCount(i); j++) {
          days.push({ dayTitle: j });
        }
      }
      if (check == lenghtCheck) {
        for (let j = 1; j <= last; j++) {
          days.push({ dayTitle: j });
        }
      }
      month.push({ monthTitle: i, day: days });
      days = [];
      check++;
    }

    const calendar = { year: [{ yearTitle: year, month }] };
    console.log(calendar);
    return calendar;
  }

  // const data = console.log(data);
};

export default function Datepicker() {
  // let date = moment().add(543, "year").format("D MMMM YYYY");
  const router = useRouter();
  const json = Date("3/2/2565", "13/4/2566");
  const goBack = () => {
    localStorage.removeItem("bookingData");
    router.back();
  };

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data == null) {
      goBack();
    }
  });

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-link active">
          <button onClick={goBack} className="mb-3 btn btn-dark btn-sm">
            ย้อนกลับ
          </button>
        </div>
      </nav>

      <div>
        {/* {date} */}
        <PaginatedItems itemsPerPage={1} data={json} />
        {/* <BoxCalendar day="วันที่ 1" empty="1" isset="2" /> */}
      </div>
    </div>
  );
}
