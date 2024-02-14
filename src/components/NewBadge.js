import React from "react";
import styled from "styled-components";

const NewBadge = () => {
  return <New>신상품</New>;
};

export default NewBadge;

const New = styled.div`
  width: 48px;
  height: 26px;
  background: ${(props) => props.theme.bgColor};
  color: #fff;
  font-size: 13px;
  margin-right: 6px;
  text-align: center;
  line-height: 25px;
`;
