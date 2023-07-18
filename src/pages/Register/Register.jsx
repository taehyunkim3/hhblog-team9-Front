import NavBar from "../../components/NavBar/NavBar";

import { StCreateDesk } from "../CreateDesk/CreateDeskStyle";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postSignUp } from "../../services/api";
import { queryClient } from "../../routes/Router";
import { useNavigate } from "react-router-dom";

const initialInput = {
  userId: "",
  userPassword: "",
  verifyPassword: "",
  name: "",
  email: "",
};

const idRegExp = /^[a-z0-9]{4,15}$/;
// const passwordRegExp = /(?=.*\d)(?=.*[a-z][A-Z])(?=.*!@#).{4,15}/;
const passwordRegExp = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#]).{4,15}/;
const nameRegExp = /^[가-힣]{2,6}$/;
const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);

  const [wrongPassword, setWrongPassword] = useState(false);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [wrongId, setWrongId] = useState(false);
  const [wrongName, setWrongName] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [submitForm, setSubmitForm] = useState(false); //화면 나갈때 붉은글씨 방지
  const [loading, setLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: postSignUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
    },
    onError: (error) => {
      if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
        alert(
          "사이트 백앤드 서버와 통신이 어려운것 같아요. 관리자에게 문의해주세요!"
        );
      } else {
        alert(error);
      }
    },
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    setNoMatchPassword(false);
    setWrongPassword(false);
    setWrongId(false);
    setWrongName(false);
    setWrongEmail(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (input.userPassword !== input.verifyPassword) {
      setNoMatchPassword(true);
    }
    if (!idRegExp.test(input.userId)) {
      setWrongId(true);
    }
    if (!passwordRegExp.test(input.userPassword)) {
      setWrongPassword(true);
    }
    if (!nameRegExp.test(input.name)) {
      setWrongName(true);
    }
    if (!emailRegExp.test(input.email)) {
      setWrongEmail(true);
    }

    if (
      !wrongId &&
      !wrongPassword &&
      !noMatchPassword &&
      !wrongName &&
      !wrongEmail &&
      input.userId &&
      input.userPassword &&
      input.verifyPassword &&
      input.name &&
      input.email
    ) {
      setSubmitForm(true);
    }
  };

  useEffect(() => {
    if (submitForm) {
      setLoading(true);
      mutation.mutate({
        userId: input.userId,
        userPassword: input.userPassword,
        name: input.name,
        email: input.email,
      });
      setSubmitForm(false);
      setInput(initialInput);
    }
  }, [
    // input.email,
    // input.name,
    // input.userId,
    // input.userPassword,
    // mutation,
    submitForm,
  ]);

  return (
    <>
      <NavBar page="create" />
      <StCreateDesk>
        <h1>회원가입</h1>

        <form onSubmit={onSubmitHandler}>
          {wrongId && (
            <p>아이디는 4~15자의 영문 소문자, 숫자만 사용 가능합니다.</p>
          )}
          <input
            type="text"
            name="userId"
            value={input.userId}
            onChange={onChangeHandler}
            placeholder="아이디"
          />
          {wrongPassword && (
            <p>
              비밀번호는 영문 + 숫자 + !@# 를 조합한 4~15자리로 가능합니다. (ex:
              1@#ab)
            </p>
          )}

          <input
            type="password"
            name="userPassword"
            value={input.userPassword}
            onChange={onChangeHandler}
            placeholder="비밀번호"
          />
          {noMatchPassword && <p>비밀번호가 일치하지 않습니다.</p>}
          <input
            type="password"
            name="verifyPassword"
            value={input.verifyPassword}
            onChange={onChangeHandler}
            placeholder="비밀번호 확인"
          />
          {wrongName && <p>이름은 2~6자의 한글만 사용 가능합니다.</p>}
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={onChangeHandler}
            placeholder="이름"
          />
          {wrongEmail && <p>이메일 형식이 올바르지 않습니다.</p>}
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={onChangeHandler}
            placeholder="이메일"
          />
          <button type="submit">{loading ? "제출중" : "입력완료"}</button>
        </form>
      </StCreateDesk>
    </>
  );
};

export default Register;
