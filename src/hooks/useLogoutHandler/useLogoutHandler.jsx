// import React from "react";
// import { userLogout } from "../../redux/reducers/userInfo";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { queryClient } from "../../routes/Router";
// const useLogoutHandler = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   localStorage.removeItem("token");
//   dispatch(userLogout());
//   navigate("/login");
//   queryClient.refetchQueries("user");
// };

// export default useLogoutHandler;
