import React from "react";
import urlImg from "../public/hero.jpg";
import Link from "next/link";
import Image from "next/image";
function Hero() {
  return (
    <div className="Hero">
      <section className="pt-4 mb-5 pt-md-11">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-5 col-lg-6 order-md-2">
              <Image
                src={urlImg}
                className="img-fluid mw-md-150 mw-lg-130 mb-6 mb-md-0 aos-init aos-animate"
                alt=""
              />
            </div>
            <div className="col-12 col-md-7 col-lg-6 order-md-1 aos-init aos-animate">
              <h1
                style={{ fontWeight: "bold" }}
                className="display-6 text-center text-md-left"
              >
                <div className="row">
                  <div className="col-12 col-md-auto pr-md-0">ระบบจองวัน</div>
                  <div className="col-12 col-md-12 col-lg-auto">
                    <span className="text-primary">ทำสัญญาเงินกู้</span>
                  </div>
                </div>
              </h1>

              <p className="lead text-center text-md-left text-muted mb-6 mb-lg-8">
                Build a beautiful, modern website with flexible Bootstrap
                components built from scratch.
              </p>

              <div className="text-center text-md-left">
                <Link href="/form">
                  <a className="btn btn-primary shadow lift me-1 mr-1">
                    เริ่มต้นการจอง
                  </a>
                </Link>
                <a href="" className="btn btn-secondary shadow lift me-1">
                  ตรวจสอบสถานะการจอง
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
