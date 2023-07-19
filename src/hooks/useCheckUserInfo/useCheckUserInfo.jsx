// import { useQuery } from "@tanstack/react-query";
// import React, { useCallback, useEffect } from "react";
// import { getMyInfo } from "../../services/api";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { userLogin, userLogout } from "../../redux/reducers/userInfo";

// const useCheckUserInfo = (token) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const fetchData = useCallback(async () => {
//     try {
//       const data = await getMyInfo(token);
//       console.log("토큰 유효성 검사 성공✅");
//       dispatch(userLogin(data));
//     } catch (error) {
//       console.log("토큰 유효성 검사 실패🛑" + error);
//       // localStorage.removeItem("token");
//       // dispatch(userLogout());
//       // navigate("/login");
//     }
//   }, [token, dispatch, navigate]);
//   useEffect(() => {
//     if (token) {
//       fetchData();
//     }
//   }, [token, fetchData]);
//   if (!token) {
//     return;
//   }
// };

// export default useCheckUserInfo;
