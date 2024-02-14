import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Item, Image, DeleteButton } from "./CartItem";
import { priceWithCommas } from "../util";
import deleteIcon from "../imgs/icon-delete.png";
import { addLikesAction } from "../redux/actions/addLikesAction";

const LikesItem = ({ info }) => {
  const dispatch = useDispatch();
  const { img, name, color, price } = info;
  const onClickDeleteItem = () => {
    dispatch(addLikesAction.manageLikes(info, false));
  };

  return (
    <Item>
      <Image>
        <img src={img} alt={name} />
      </Image>
      <Info>
        <div>
          <Name>{name}</Name>
          <Color>{color}</Color>
        </div>
        <Price>₩ {priceWithCommas(price)}</Price>
      </Info>
      <DeleteButton onClick={onClickDeleteItem}>
        <img src={deleteIcon} alt="delete" />
      </DeleteButton>
    </Item>
  );
};

export default React.memo(LikesItem);

const Info = styled.div`
  padding: 15px 30px;
  width: 72%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  * {
    font-weight: 400;
  }
`;
const Name = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 4px;
`;
const Color = styled.h5`
  font-size: 14px;
  color: #aaa;
`;
const Price = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.bgColor};
`;
