import decode from "jwt-decode";

import * as ls from "local-storage";
const checkLog = () => {
  const token = ls.get("token");
  if (!token) {
    return false;
  }
  try {
    const { date, role } = decode(token);
    if (date < new Date().getTime() / 1000 && role != "admin") {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

export default checkLog;
