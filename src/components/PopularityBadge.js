import React from "react";
import styled from "styled-components";

const PopularityBadge = () => {
  return <Popular>인기</Popular>;
};

export default PopularityBadge;

const Popular = styled.div`
  width: 48px;
  height: 26px;
  background: #dd0202;
  color: #fff;
  font-size: 13px;
  margin-right: 6px;
  text-align: center;
  line-height: 25px;
`;
