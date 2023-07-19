import { getMyInfo } from "../../services/api";

export const checkLoginStatus = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const userInfo = await getMyInfo(token);
    return userInfo ? true : false;
  } catch (e) {
    console.log("로그인유효성검사 실패🛑" + e);
    return false;
  }
};
