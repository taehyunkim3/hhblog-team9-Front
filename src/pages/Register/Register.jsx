import NavBar from "../../components/NavBar/NavBar";

import { StCreateDesk } from "./RegisterStyle";
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

const idRegExp = /^[a-z0-9]{4,10}$/; // 소문자와 숫자만, 4-10자,
const passwordRegExp = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{4,15}/; // 4-15자
const nameRegExp = /^[가-힣a-zA-Z0-9]{1,20}$/; //글자수 1-20자 한글, 영어, 숫자만 가능.
const emailRegExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);

  const [wrongPassword, setWrongPassword] = useState(true);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [wrongId, setWrongId] = useState(true);
  const [wrongName, setWrongName] = useState(true);
  const [wrongEmail, setWrongEmail] = useState(true);
  // const [submitForm, setSubmitForm] = useState(false); //화면 나갈때 붉은글씨 방지
  const [loading, setLoading] = useState(false);

  // const mutation = useMutation({
  //   mutationFn: postSignUp,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["user"] });
  //     navigate("/login");

  //   },
  //   onError: (error) => {
  //     if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
  //       alert(
  //         "사이트 백앤드 서버와 통신이 어려운것 같아요. 관리자에게 문의해주세요!"
  //       );
  //     } else {
  //       alert(error);
  //     }
  //   },
  // });
  const handleSignUp = async (user) => {
    try {
      await postSignUp(user);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
    } catch (e) {
      alert(e.response.data.msg);
      navigate("/register");
      window.location.reload(); // 새로고침
    }
  };

  const onChangeHandler = (e) => {
    if (input.userPassword !== input.verifyPassword) {
      setNoMatchPassword(true);
    } else if (input.userPassword === input.verifyPassword) {
      setNoMatchPassword(false);
    }
    if (!idRegExp.test(input.userId)) {
      setWrongId(true);
    } else if (idRegExp.test(input.userId)) {
      setWrongId(false);
    }

    if (!passwordRegExp.test(input.userPassword)) {
      setWrongPassword(true);
    } else if (passwordRegExp.test(input.userPassword)) {
      setWrongPassword(false);
    }

    if (!nameRegExp.test(input.name)) {
      setWrongName(true);
    } else if (nameRegExp.test(input.name)) {
      setWrongName(false);
    }
    if (!emailRegExp.test(input.email)) {
      setWrongEmail(true);
    } else if (emailRegExp.test(input.email)) {
      setWrongEmail(false);
    }
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
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
      setLoading(true);
      handleSignUp({
        userId: input.userId,
        userPassword: input.userPassword,
        name: input.name,
        email: input.email,
      });

      setInput(initialInput);
    } else {
      alert("모든 항목이 통과✅ 상태 인지 확인해주세요 !😱");
    }
  };

  return (
    <>
      <StCreateDesk>
        <NavBar page="create" />
        <h1>회원가입</h1>

        <form onSubmit={onSubmitHandler}>
          <label>
            아이디
            <span>
              {wrongId
                ? ` ⛔️ 아이디는 4~15자의 영문 소문자, 숫자만 사용 가능합니다. (ex:aaaaa)`
                : " ✅ 통과!"}
            </span>
            <br />
            <input
              type="text"
              name="userId"
              value={input.userId}
              onChange={onChangeHandler}
              placeholder="아이디"
            />
          </label>
          <label>
            비밀번호{" "}
            <span>
              {wrongPassword
                ? ` ⛔️ 비밀번호는 영문 + 숫자 + !@#$%^&* 를 조합한 8~15자리로
                가능합니다. (ex: aaaaa11!!)`
                : " ✅ 통과!"}
            </span>
            <br />
            <input
              type="password"
              name="userPassword"
              value={input.userPassword}
              onChange={onChangeHandler}
              placeholder="비밀번호"
            />
          </label>
          <label>
            비밀번호 확인{" "}
            <span>
              {input.verifyPassword &&
                (input.verifyPassword !== input.userPassword
                  ? " ⛔️ 비밀번호가 일치하지 않습니다."
                  : " ✅ 통과!")}
            </span>
            <br />
            <input
              type="password"
              name="verifyPassword"
              value={input.verifyPassword}
              onChange={onChangeHandler}
              placeholder="비밀번호 확인"
            />
          </label>

          <label>
            이름
            <span>
              {wrongName
                ? ` ⛔️ 이름은 1~20자의 한글, 영어, 숫자만 사용 가능합니다.`
                : " ✅ 통과!"}
            </span>
            <br />
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={onChangeHandler}
              placeholder="이름"
            />
          </label>
          <label>
            이메일
            <span>
              {input.email &&
                (wrongEmail
                  ? " ⛔️ 이메일 형식에 맞게 입력해주세요.(ex:aaa@aaa.com)"
                  : " ✅ 통과!")}
            </span>
            <br />
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={onChangeHandler}
              placeholder="이메일"
            />
          </label>

          <button type="submit">{loading ? "제출중" : "입력완료"}</button>
        </form>
      </StCreateDesk>
    </>
  );
};

export default Register;
