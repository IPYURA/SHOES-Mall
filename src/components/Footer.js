import React from "react";
import styled from "styled-components";

const Footer = () => {
  return <Container>© 2024. Cho DongGeon. All right reserved.</Container>;
};

export default Footer;

const Container = styled.div`
  width: 100%;
  height: 108px;
  display: grid;
  place-items: center;
  background: ${(props) => props.theme.bgColor};
  color: #fff;
`;
