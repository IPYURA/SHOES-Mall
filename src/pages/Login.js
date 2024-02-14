import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import googleIcon from "../imgs/icon-google.png";
import { useDispatch } from "react-redux";
import { authenticateAction } from "../redux/actions/authenticateAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  let goBackBan;
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const init = async () => {
    await auth.authStateReady();
  };
  useEffect(() => {
    init();
  }, []);

  const moveLatestPath = () => {
    if (location.state !== null && location.state !== undefined) {
      goBackBan = location.state.goBackBan;
    }
    goBackBan ? navigate("/") : navigate(-1);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const tryLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch(authenticateAction.manageAuthentication(true));
        moveLatestPath();
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            setError("유효한 이메일의 형식이 아닙니다.");
            break;
          case "auth/invalid-credential":
            setError("아이디 또는 비밀번호가 일치하지 않습니다.");
            break;
          default:
            setError("로그인에 실패했습니다.");
        }
        setEmail("");
        setPassword("");
      });
  };

  const onClickGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        dispatch(authenticateAction.manageAuthentication(true));
        moveLatestPath();
      })
      .catch(() => {
        setError("Google 계정으로 로그인에 실패했습니다.");
      });
  };

  return (
    <Container>
      <LoginContainer onSubmit={tryLogin}>
        <h2>로그인</h2>
        <input
          onChange={onChangeEmail}
          onFocus={() => setError(false)}
          required
          type="text"
          placeholder="이메일을 입력하세요"
          value={email}
        />
        <input
          onChange={onChangePassword}
          onFocus={() => setError(false)}
          required
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
        />

        <LoginButton type="submit" value="로그인" />

        <Question>
          아직 회원이 아니십니까?{" "}
          <SignUp onClick={() => navigate("/signup")}>회원가입하기</SignUp>
          {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : ""}
        </Question>
      </LoginContainer>

      <OR>
        <Line></Line>
        <span>또는</span>
        <Line></Line>
      </OR>
      <GoogleLogin onClick={onClickGoogleLogin}>
        <img src={googleIcon} alt="googleIcon" />
        Google 계정으로 로그인
      </GoogleLogin>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 244px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const LoginContainer = styled.form`
  width: 630px;
  h2 {
    margin-bottom: 38px;
    font-size: 40px;
    font-weight: 400;
  }
  input {
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding-left: 10px;
    margin-bottom: 29px;
    border-radius: 4px;
    border: 1px solid #ccc;
    &::placeholder {
      color: #ccc;
    }
  }
`;
const Question = styled.div`
  position: relative;
  text-align: center;
`;
const ErrorMessage = styled.div`
  position: absolute;
  width: 100%;
  top: -27px;
  left: 0;
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.errTextColor};
`;
const LoginButton = styled.input`
  width: 100%;
  height: 45px;
  background: ${(props) => props.theme.bgColor};
  color: #fff;
  margin-bottom: 40px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
`;
const SignUp = styled.button`
  font-size: 16px;
  font-weight: 500;
  text-decoration: underline;
  border: none;
  background: none;
`;
const GoogleLogin = styled.button`
  width: 630px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  gap: 10px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #aaa;
  color: ${(props) => props.theme.bgColor};
  img {
    height: 50%;
  }
`;
const OR = styled.div`
  width: 630px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: auto;
    font-size: 11px;
    color: #ccc;
  }
`;
const Line = styled.div`
  width: 295px;
  height: 1px;
  background: #ccc;
`;
