import { CgProfile } from "react-icons/cg";
import { TbDeviceDesktopPlus } from "react-icons/tb";
import { FaPenRuler } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../../redux/reducers/userInfo";
import { queryClient } from "../../routes/Router";
import { getMyInfo } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { StNavBar, StTitle } from "./NavBarStyle";
const NavBar = ({ page = "home", position = "static" }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { isLogin, userName, deskId } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const onProfileClickHandler = () => {
    navigate("/login");
  };
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(userLogout());
    navigate("/login");
    queryClient.refetchQueries("user");
  };
  useQuery(["user"], () => getMyInfo(token), {
    enabled: !!token,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("토큰 유효성 검사 성공✅");
      dispatch(userLogin(data));
    },
    onError: (error) => {
      if (error.message === "Token expired") {
        // 로컬스토리지 토큰 삭제
        localStorage.removeItem("token");
        // 로그인 페이지로 이동
        dispatch(userLogout());

        navigate("/login");
        console.log("토큰 만료🛑" + error);
      } else {
        localStorage.removeItem("token");
        dispatch(userLogout());
        navigate("/login");
        console.log("토큰 유효성 검사 통신 오류🛑" + error);
      }
    },
    retry: (failureCount, error) => {
      return false;
    },
  });
  //

  return (
    <StNavBar position={position}>
      <StTitle onClick={() => navigate("/")}>항구LOG</StTitle>
      <p>99일 우리들의 항해 기록 / ver.0.9.6.7 / beta 업데이트 7.20 10:19</p>

      {/* {page === "home" && <DeskPostSelector />} */}
      {page === "home" &&
        (isLogin ? (
          deskId === null ? (
            <TbDeviceDesktopPlus
              className="addTable"
              onClick={() => navigate("/createdesk")}
            />
          ) : (
            <FaPenRuler
              className="addTable"
              onClick={() => navigate(`/createdesk?deskId=${deskId}`)}
            />
          )
        ) : null)}
      {page === "deskdetail" && <p>deskDetailNav</p>}
      {isLogin && <p>{userName}님 반갑습니다.</p>}
      {isLogin ? (
        <button onClick={onLogoutHandler}>로그아웃</button>
      ) : (
        <CgProfile className="profile" onClick={onProfileClickHandler} />
      )}
    </StNavBar>
  );
};
NavBar.propTypes = {
  page: PropTypes.string,
  position: PropTypes.string,
};
export default NavBar;
