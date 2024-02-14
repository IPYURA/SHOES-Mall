import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      if (isLoading || email === "" || password === "") return;
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입을 성공적으로 완료했습니다!");
      navigate("/login", { state: { goBackBan: true } });
    } catch (e) {
      setEmail("");
      setPassword("");

      if (String(e).indexOf("auth/email-already-in-use") !== -1) {
        setError("이미 사용중인 이메일입니다.");
      } else if (String(e).indexOf("auth/invalid-email") !== -1) {
        setError("유효하지 않은 이메일 형식입니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <h2>회원가입</h2>
        <label htmlFor="inputEmail">이메일</label>
        <input
          onChange={onChange}
          name="email"
          type="email"
          value={email}
          id="inputEmail"
          placeholder="사용하실 이메일을 입력하세요."
          required
        />
        <label htmlFor="inputPW">비밀번호</label>
        <input
          onChange={onChange}
          name="password"
          type="password"
          value={password}
          id="inputPW"
          placeholder="사용하실 비밀번호를 입력하세요."
          required
          minLength={6}
        />
        <SignUpButton
          type="submit"
          value={isLoading ? "Loading..." : "회원가입"}
        ></SignUpButton>
        {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : null}
      </Form>
    </Container>
  );
};

export default SignUp;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 244px);
  display: grid;
  place-items: center;
`;
const Form = styled.form`
  width: 630px;
  h2 {
    margin-bottom: 38px;
    font-size: 40px;
    font-weight: 400;
  }
  label {
    color: ${(props) => props.theme.bgColor};
    display: block;
  }
  input {
    width: 100%;
    height: 45px;
    margin: 7px 0 30px;
    padding-left: 10px;
    border-radius: 4px;
    border: 1px solid #aaa;
    &::placeholder {
      color: #aaa;
    }
    &[type="submit"] {
      border: none;
      cursor: pointer;
    }
  }
`;
const SignUpButton = styled.input`
  width: 100%;
  margin-left: 0;
  margin-top: 20px;
  background: ${(props) => props.theme.bgColor};
  color: #fff;
  font-size: 16px;
  outline: none;
`;
const ErrorMessage = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${(props) => props.theme.errTextColor};
`;
