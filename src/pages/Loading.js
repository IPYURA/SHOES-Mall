import React from "react";
import styled from "styled-components";
import "../App.css";

const Loding = () => {
  return (
    <Container>
      <LoadingBox>
        <span className="loader"></span>
      </LoadingBox>
    </Container>
  );
};

export default Loding;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 108px);
  margin-top: -20px;
  display: grid;
  place-items: center;
`;
const LoadingBox = styled.div`
  width: 100px;
  height: 100px;
  font-size: 50px;
`;
