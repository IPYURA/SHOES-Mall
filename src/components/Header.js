import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import loginIcon from "../imgs/icon-login.png";
import logoutIcon from "../imgs/icon-logout.png";
import { useDispatch } from "react-redux";
import { authenticateAction } from "../redux/actions/authenticateAction";
import { productAction } from "../redux/actions/productAction";
import { getAuth, signOut } from "firebase/auth";

const Header = ({ islogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const logOut = () => {
    dispatch(authenticateAction.manageAuthentication(false));
    signOut(auth)
      .then(() => {
        alert("정상적으로 로그아웃 되었습니다.");
        navigate("/");
      })
      .catch(() => {
        alert("로그아웃에 실패했습니다");
      });
  };
  const onClickLogin = () => {
    islogin ? logOut() : navigate("/login");
  };
  const onClickLogo = () => {
    navigate("/");
    dispatch(productAction.searchProduct(""));
  };
  return (
    <Wrap>
      <Container>
        <Logo onClick={onClickLogo} />
        <Login onClick={onClickLogin}>
          {islogin ? (
            <img src={logoutIcon} alt="login" />
          ) : (
            <img src={loginIcon} alt="login" />
          )}
          {islogin ? " 로그아웃" : " 로그인"}
        </Login>
      </Container>
      <Search />
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  width: 100%;
  height: 136px;
  background: ${(props) => props.theme.bgColor};
`;
const Container = styled.div`
  position: relative;
  width: 1180px;
  height: 80px;
  margin: 0 auto;
  padding: 0 20px;
  color: #fff;
  background: ${(props) => props.theme.bgColor};
`;
const Logo = styled.div`
  width: 160px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    font-family: "Anton", sans-serif;
    font-size: 62px;
    letter-spacing: 2px;
    content: "SHOES";
  }
  cursor: pointer;
`;
const Login = styled.button`
  width: auto;
  height: 100%;
  position: absolute;
  right: 20px;
  top: 0;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 18px;
  background: none;
  border: none;
  img {
    width: 32px;
  }
`;
