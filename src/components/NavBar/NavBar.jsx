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
import { useAuth } from "../../hooks/useAuth";
const NavBar = ({ page = "home", position = "static" }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { isLogin, userName, deskId } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const { logout } = useAuth(token);

  const onProfileClickHandler = () => {
    navigate("/login");
  };
  const onLogoutHandler = () => {
    logout();
    navigate("/login");
    queryClient.refetchQueries("user");
  };

  return (
    <StNavBar position={position}>
      <StTitle onClick={() => navigate("/")}>항구LOG</StTitle>
      <p>99일 우리들의 항해 기록 / ver.0.9.7 / beta 업데이트 7.20 12:58</p>

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
