import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaginatedItems from "../../components/Datebox/PaginatedItems";
import moment from "moment";
import "moment/locale/th";
import Swal from "sweetalert2";
import axios from "axios";
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

export default function Datepicker() {
  // let date = moment().add(543, "year").format("D MMMM YYYY");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter();
  const goBack = () => {
    localStorage.removeItem("bookingData");
    router.back();
  };

  const clean = (data) => {
    // sub
    function get_month(date) {
      const temp = date.map((item) => {
        const dt = new Date(item);
        const month = dt.getMonth();
        return month;
      });
      const newMonth = [...new Set(temp)];
      return newMonth;
    }
    // main
    const date = data.map((item) => item.dateTitle);
    const month = get_month(date);
    // main oBj
    const Obj = month.map((item, index) => {
      // Sub  Obj
      const child = date.map((child_item, index) => {
        const dt = new Date(child_item);
        const month = dt.getMonth();
        const days = dt.getDate();
        if (item == month) {
          return {
            id: data[index]._id,
            days: days,
          };
        }
      });

      const year = date.map((child_item) => {
        const dt = new Date(child_item);
        const year = dt.getFullYear();
        return year;
      });

      const filteredArr = child.filter((elm) => elm);

      const json = {
        year: year[index],
        month: item,
        days: filteredArr,
      };
      return json;
    });
    return Obj;
  };

  const getDate = async () => {
    try {
      const { data } = await axios.get(`${process.env.URL}/api/booking/`);
      const newData = clean(data);
      setData(newData);
      // setData(Date(data[0], data[lenght]));
    } catch (err) {
      Swal.fire("error", err.message, "error");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (data == null) {
      goBack();
    } else {
      setIsLoading(false);
      getDate();
    }
  }, []);
  if (isLoading) {
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
      <nav className="nav">
        <div className="nav-link active">
          <button onClick={goBack} className="mb-3 btn btn-dark btn-sm">
            ย้อนกลับ
          </button>
        </div>
      </nav>
      <div>
        <PaginatedItems itemsPerPage={1} data={data} />
      </div>
    </div>
  );
}
