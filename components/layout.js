import Navbar from "./navbar";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
import axios from "axios";

export default function Layout({ children }) {
  const [isLogin, setIslogin] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [profile, setProfile] = useState({});
  async function getUser(id) {
    try {
      const res = await axios.get(`http://localhost:3001/api/users/${id}`);
      const user = {
        fullname: res.data.firstname + " " + res.data.lastname,
        avatar:
          "https://stickerly.pstatic.net/sticker_pack/n4iDHYuyvbeamVgnfckVjw/RW4XCZ/31/5cacc1f9-45ef-445d-94a9-f066d212f2f3.png",
      };
      setProfile(user);
      setIslogin(true);
    } catch (err) {
      console.error(err);
    }
  }

  // useEffect(
  //   () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const { sub } = decode(token);
  //       getUser(sub);
  //     }
  //   },
  //   [isLogin],
  //   [profile],
  //   [isLoad]
  // );
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
