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
//protectedRoute에서 사용하는 함수입니다.
//로그인 상태를 체크합니다.
