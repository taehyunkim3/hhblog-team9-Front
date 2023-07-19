import { styled } from "styled-components";
import DeskPostSelector from "../Selector/DeskPostSelector";
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
const StNavBar = styled.div`
  height: 6rem;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  border-bottom: 1px solid #e0e0e0;
  top: 0;
  position: ${(prop) => (prop.position === "fixed" ? "fixed" : "static")};

  background-color: #f6f5f7;
  opacity: 0.7;
  .profile {
    font-size: 2rem;
    cursor: pointer;
    margin-right: 0;
  }
  .addTable {
    font-size: 2rem;
    cursor: pointer;
    margin-left: auto;
    margin-right: 0;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: red;
    cursor: pointer;
  }
`;
const NavBar = ({
  page = "home",
  position = "static",
  // isLogin = false,
  // userInfo = { userId: "", userName: "", deskId: null },
}) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { isLogin, userId, userName, deskId } = useSelector(
    (state) => state.userInfo
  );
  const navigate = useNavigate();
  const onProfileClickHandler = () => {
    navigate("/login");
  };
  const onLogoutHandler = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("token");
    dispatch(userLogout());
    navigate("/login");
    queryClient.refetchQueries("user");
  };
  const { isLoading: userLoading, isError: userError } = useQuery(
    ["user"],
    () => getMyInfo(token),
    {
      enabled: !!token,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        dispatch(userLogin(data));
      },
      onError: (error) => {
        console.log(error);

        if (error.message === "Token expired") {
          // 로컬스토리지 토큰 삭제
          localStorage.removeItem("token");
          // 로그인 페이지로 이동
          dispatch(userLogout());

          navigate("/login");
        } else {
          dispatch(userLogout());
        }
      },
      retry: (failureCount, error) => {
        return false;
      },
    }
  );
  //

  return (
    <StNavBar position={position}>
      <h1 onClick={() => navigate("/")}>항구LOG</h1>
      <p>99일 우리들의 항해 기록 ver.0.9</p>

      {page === "home" && <DeskPostSelector />}
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
  // isLogin: PropTypes.bool,
  // userInfo: PropTypes.shape({
  //   userId: PropTypes.string,
  //   userName: PropTypes.string,
  //   deskId: PropTypes.string,
  // }),
};
export default NavBar;
