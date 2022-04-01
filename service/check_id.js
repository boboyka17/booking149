import axios from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
const check_id = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.URL}/api/customer/idcard/${id}`
    );
    const obj = {
      payload: data,
    };
    localStorage.setItem("bookingData", JSON.stringify(obj));
    Router.push("/Result");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: `เกิดข้อผิดพลาด`,
      text: "ขออภัยไม่พบเลขประจำตัวประชาชนของท่าน",
      confirmButtonText: "ยืนยัน",
    });
  }
};

export default check_id;
