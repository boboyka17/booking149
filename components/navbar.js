import React from "react";
import Link from "next/link";
export default function navbar() {
  return (
    <nav className="container-fluid bg-white sticky-top shadow p-3 mb-5 bg-body rounded">
      <div className="container d-flex flex-wrap justify-content-center justify-content-md-between">
        <Link href="/">
          <a
            style={{ fontWeight: "bold", fontSize: "1.5em" }}
            className="navbar-brand text-primary refont"
          >
            ระบบจองวันทำสัญญาเงินกู้
          </a>
        </Link>
      </div>
    </nav>
  );
}
