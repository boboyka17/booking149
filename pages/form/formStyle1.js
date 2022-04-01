/* eslint-disable-line */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import NumberFormat from "react-number-format";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

export default function formStyle1() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setData = async (payload) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.URL}/api/customer`,
        payload
      );

      if (data.status) {
        localStorage.setItem("bookingData", JSON.stringify(data));
        router.push("../Datepicker");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดดพลาด",
          text: "ไม่สามารถบันทึกได้เนื่องจากเลขบัตรประชาชนของท่านถูกนำไปใช้แล้ว กรุณาตรวจสอบสถานะการจอง หรือลองใหม่อีกครั้ง",
          confirmButtonText: "ยืนยัน",
        });
      }
    } catch (err) {
      Swal.fire(err.message, "", "error");
    }
  };

  // Schema form
  const validationSchema = Yup.object().shape({
    idCard: Yup.string()
      .required("กรุณาป้อนเลขประจำตัวประชาชน")
      .matches(/^[0-9\-]{17}$/, "กรุณาป้อนเลขประจำตัวประชาชนให้ครบถ้วน"),
    FirstName: Yup.string().required("กรุณาป้อนชื่อ"),
    LastName: Yup.string().required("กรุณาป้อนนามสกุล"),
    Phone: Yup.string()
      .required("กรุณาป้อนเลขเบอร์โทรศัพท์")
      .matches(/^[0-9\-]{12}$/, "กรุณาป้อนเลขเบอร์โทรศัพท์ให้ครับถ้วน"),
    Gender: Yup.string().required("กรุณาเลือกเพศของท่าน"),
  });

  // formik setting
  const formik = useFormik({
    initialValues: {
      idCard: "",
      FirstName: "",
      LastName: "",
      Phone: "",
      Gender: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data) => {
      const newData = { ...data, Type: "A" };
      setData(newData);
    },
  });

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/form">
          <a className="mb-3 btn btn-dark btn-sm">ย้อนกลับ</a>
        </Link>
      </nav>
      <h4 className="h4 text-center" style={{ fontWeight: "bold" }}>
        แบบฟอร์มสำหรับผู้พิการ
      </h4>

      <form className="row needs-validation" onSubmit={formik.handleSubmit}>
        <div className="col-md-12 mb-3">
          <label className="mr-1">
            เลขประจำตัวประชาชน
            <span>
              <small className="ml-1 text-danger">
                (ต้องเป็นเลขประจำตัวประชาชนของผู้กู้เท่านั้น)
              </small>
            </span>
          </label>
        </div>
        <div className="col-md-12 mb-3">
          <NumberFormat
            format="#-####-#####-##-#"
            mask="_"
            type="text"
            className={`form-control ${formik.errors.idCard && `is-invalid`}`}
            placeholder="กรุณาป้อนเลขประจำตัวประชาชน"
            onChange={formik.handleChange}
            value={formik.values.idCard}
            name="idCard"
          />

          <div className="invalid-feedback">
            {formik.errors.idCard ? formik.errors.idCard : null}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="text-success">ชื่อผู้พิการ</label>
          <input
            name="FirstName"
            type="text"
            className={`form-control ${
              formik.errors.FirstName && `is-invalid`
            }`}
            placeholder="กรุณาป้อนชื่อ"
            onChange={formik.handleChange}
            value={formik.values.FirstName}
          />
          <div className="invalid-feedback">
            {formik.errors.FirstName ? formik.errors.FirstName : null}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label className="text-success">นามสกุลผู้พิการ</label>
          <input
            name="LastName"
            type="text"
            className={`form-control ${formik.errors.LastName && `is-invalid`}`}
            placeholder="กรุณาป้อนชื่อ"
            onChange={formik.handleChange}
            value={formik.values.LastName}
          />
          <div className="invalid-feedback">
            {formik.errors.LastName ? formik.errors.LastName : null}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label>เบอร์โทรศัพท์</label>
          <NumberFormat
            format="###-###-####"
            mask="_"
            type="text"
            className={`form-control ${formik.errors.Phone && `is-invalid`}`}
            placeholder="กรุณาป้อนเบอร์โทรศัพท์"
            onChange={formik.handleChange}
            value={formik.values.Phone}
            name="Phone"
          />
          <div className="invalid-feedback">
            {formik.errors.Phone ? formik.errors.Phone : null}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label>เพศ</label>
          <select
            name="Gender"
            className={`form-control ${formik.errors.Gender && `is-invalid`}`}
            onChange={formik.handleChange}
            value={formik.values.Gender}
          >
            <option defaultValue>กรุณาเลือกเพศ</option>
            <option value="M">ชาย</option>
            <option value="F">หญิง</option>
          </select>
          <div className="invalid-feedback">
            {formik.errors.Gender ? formik.errors.Gender : null}
          </div>
        </div>
        <div className="col-md-12 mt-3 mb-3">
          {isLoading ? (
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              style={{ fontWeight: "bold" }}
              disabled
            >
              <span
                class="spinner-border spinner-border-sm mr-3"
                role="status"
                aria-hidden="true"
              ></span>
              กำลังบันทึก
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block"
              style={{ fontWeight: "bold" }}
            >
              บันทึก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
