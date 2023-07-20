// hooks/useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../redux/reducers/userInfo";
import { getMyInfo } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = (token) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const logout = () => {
        localStorage.removeItem("token");
        dispatch(userLogout());
    };

    return { logout };
};
