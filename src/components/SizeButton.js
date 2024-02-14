import React from "react";
import styled from "styled-components";

const SizeButton = ({ size, onClick, selected }) => {
  return (
    <Size
      onClick={onClick}
      style={
        selected
          ? { background: "#1a1a1a", color: "#fff" }
          : { background: "#fff" }
      }
    >
      {size}
    </Size>
  );
};

export default SizeButton;

const Size = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 44px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
