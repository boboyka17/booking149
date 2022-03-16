import React, { useEffect, useState } from "react";
import decode from "jwt-decode";
import Router from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
export default function navbar() {
  const [isLogin, setIslogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    Router.push("/login");
    setToken("");
    setIslogin(false);
    setProfile({});
  };
  // v1.0.1
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  });

  useEffect(
    () => {
      if (token != null) {
        try {
          const data = decode(token);
          setProfile(data);
        } catch (err) {
          setIslogin(false);
        }
        setIslogin(true);
      } else {
        setIslogin(false);
      }
    },
    [token],
    [isLogin]
  );

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
        {isLogin && (
          <div className="d-flex align-items-center justify-content-around">
            <span className="mr-3 text-primary" style={{ fontWeight: "bold" }}>
              {profile.fullname}
            </span>

            <div className="dropdown">
              <button
                className="avatar-btn "
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={profile.avatar} alt="Avatar" className="avatar"></img>
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  แก้ไขโปรไฟล์
                </a>
                <a className="dropdown-item" href="#">
                  เปลี่ยนรูป
                </a>
                <a className="dropdown-item" href="#">
                  เปลี่ยนรหัสผ่าน
                </a>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
