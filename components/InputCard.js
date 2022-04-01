import React from "react";
import { useFormik } from "formik";
import NumberFormat from "react-number-format";
import * as Yup from "yup";
import check_id from "../service/check_id";
export default function InputCard() {
  // Schema form
  const validationSchema = Yup.object().shape({
    idCard: Yup.string()
      .required("กรุณาป้อนเลขประจำตัวประชาชน")
      .matches(/^[0-9\-]{17}$/, "กรุณาป้อนเลขประจำตัวประชาชนให้ครบถ้วน"),
  });

  const formik = useFormik({
    initialValues: {
      idCard: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (data) => {
      check_id(data.idCard);
    },
  });
  return (
    <div className="container mt-2">
      <form className="row needs-validation" onSubmit={formik.handleSubmit}>
        <small id="" class="form-text text-muted mb-1">
          * กรุณาป้อนเลขประจำตัวประชาชนให้ถูกต้อง
        </small>
        <div className="input-group">
          <NumberFormat
            format="#-####-#####-##-#"
            mask="_"
            type="text"
            className={`form-control Hero ${
              formik.errors.idCard && `is-invalid`
            }`}
            placeholder="กรุณาป้อนเลขประจำตัวประชาชน"
            onChange={formik.handleChange}
            value={formik.values.idCard}
            name="idCard"
            style={{}}
          />
          <div class="input-group-append">
            <button type="submit" className="btn btn-primary">
              ตรวจสอบ
            </button>
          </div>
          <div className="invalid-feedback">
            {formik.errors.idCard ? formik.errors.idCard : null}
          </div>
        </div>
      </form>
    </div>
  );
}
