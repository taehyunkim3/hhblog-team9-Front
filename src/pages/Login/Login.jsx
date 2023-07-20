import NavBar from "../../components/NavBar/NavBar";

import Desk1Svg from "../../components/Desks/Desk1Svg";
import { StCreateDesk } from "./LoginStyle";
import { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { postLogIn } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../routes/Router";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/reducers/userInfo";
import Button from "../../components/Button/Button";
const initialInput = {
  userId: "",
  userPassword: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);
  const [isNoId, setNoIsId] = useState(false);
  const [isNoPassword, setIsNoPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: postLogIn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      if (data) {
        dispatch(userLogin(data));
        localStorage.setItem("token", data);
        console.log(data);
        navigate("/");
      }
    },
    onError: (error) => {
      alert("🙇🏼‍♀️" + error);
    },
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setIsNoPassword(false);
    setNoIsId(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.userId && input.userPassword) {
      mutation.mutate(input);
      setInput(initialInput);
      setIsNoPassword(false);
      setNoIsId(false);
    }
    if (!input.userId) {
      setNoIsId(true);
    }
    if (!input.userPassword) {
      setIsNoPassword(true);
    }
  };

  const onJoinHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <StCreateDesk>
        <NavBar page="create" className="nav" />
        <Desk1Svg></Desk1Svg>

        <h1>로그인</h1>

        <form onSubmit={onSubmitHandler}>
          {isNoId && <p>아이디를 입력하세요</p>}
          <input
            type="text"
            name="userId"
            value={input.userId}
            onChange={onChangeHandler}
            placeholder="id"
          />
          {isNoPassword && <p>비밀번호를 입력하세요</p>}
          <input
            type="password"
            name="userPassword"
            value={input.userPassword}
            onChange={onChangeHandler}
            placeholder="password"
          />
          <Button type="submit">로그인</Button>

          <Button
            type="button"
            onClick={() => {
              onJoinHandler();
            }}
          >
            회원가입
          </Button>
        </form>
      </StCreateDesk>
    </>
  );
};

export default Login;
