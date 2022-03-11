import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const handleSubmit = async (payload) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.URL}/api/auth`,
        data: payload,
      });
      if (res.data.token != null) {
        localStorage.setItem("token", res.data.token);
        router.push("/admin");
      } else {
        Swal.fire(res.data.message, "", "error");
      }
    } catch (err) {
      Swal.fire("error", err.message, "");
      console.error(err.message);
    }
  };
  //  Schema
  const formSchema = Yup.object().shape({
    user: Yup.string()
      .required("กรุณาป้อนชื่อผู้ใช้")
      .matches(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/, "ชื่อผู้ใช้ไม่ถูกต้อง"),
    pass: Yup.string().required("กรุณาป้อนรหัสผ่าน"),
  });

  // formik setting
  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data) => {
      handleSubmit(data);
    },
  });
  return (
    <>
      <div className="login-box card card-outline mx-auto">
        <div className="card-header text-center bg-dark">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center ml-2 text-white"
              style={{ fontSize: "1.75em", fontWeight: "bold" }}
            >
              เข้าสู่ระบบ
            </div>
          </div>
        </div>
        <div className="card-body">
          <form
            className="mb-3 needs-validation"
            onSubmit={formik.handleSubmit}
          >
            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
              <input
                type="text"
                name="user"
                className={`form-control ${formik.errors.user && `is-invalid`}`}
                placeholder="ชื่อผู้ใช้"
                onChange={formik.handleChange}
                value={formik.values.user}
              />
              <div className="invalid-feedback">
                {formik.errors.user ? formik.errors.user : null}
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
              <input
                type="password"
                name="pass"
                className={`form-control ${formik.errors.pass && `is-invalid`}`}
                placeholder="รหัสผ่าน"
                onChange={formik.handleChange}
                value={formik.values.pass}
              />
              <div className="invalid-feedback">
                {formik.errors.pass ? formik.errors.pass : null}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  เข้าสู่ระบบ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
