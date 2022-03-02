/* eslint-disable-line */
import React, { useEffect, useState } from "react";
import Link from "next/link";

const index = () => {
  // const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("../api/hello")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="Content">
      <div className="container">
        <nav className="nav">
          <Link href="/" className="nav-link active">
            <a href="/" className="mb-3 btn btn-dark btn-sm">
              ย้อนกลับ
            </a>
          </Link>
        </nav>
        <div className="card shadow mb-5 bg-body rounded">
          <h5
            className="card-header bg-primary text-white  text-center"
            style={{ fontWeight: "bold" }}
          >
            สถานะผู้กู้
          </h5>
          <div className="card-body m-3">
            <div className="row ">
              <Link href="form/formStyle1">
                <a
                  href="form/formStyle1"
                  className="btn btn-primary btn-lg btn-block"
                >
                  <i className="fas fa-wheelchair fa-lg"></i> ผู้พิการ
                </a>
              </Link>
              <Link href="form/formStyle2">
                <a
                  href="form/formStyle1"
                  className="btn btn-success btn-lg btn-block"
                >
                  <i className="fas fa-user fa-lg"></i> ผู้ดูแลคนพิการ
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default index;
