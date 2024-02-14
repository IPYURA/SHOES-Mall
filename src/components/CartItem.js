import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addCartAction } from "../redux/actions/addCartAction";
import { priceWithCommas } from "../util";
import deleteIcon from "../imgs/icon-delete.png";

const CartItem = ({ info }) => {
  const dispatch = useDispatch();
  const { img, name, color, selectedSize, price } = info;

  const onClickDeleteItem = () => {
    dispatch(addCartAction.deleteItem(info));
  };
  return (
    <Item>
      <Image>
        <img src={img} alt={name} />
      </Image>
      <Info>
        <Name>{name}</Name>
        <Color>{color}</Color>
        <Size>
          Size : {selectedSize}
          {selectedSize[0] === "2" ? " (KR)" : " (US)"}
        </Size>
        <Price>₩ {priceWithCommas(price)}</Price>
      </Info>
      <DeleteButton onClick={onClickDeleteItem}>
        <img src={deleteIcon} alt="delete" />
      </DeleteButton>
    </Item>
  );
};

export default CartItem;

export const Item = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  padding: 13px 26px;
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 20px;
`;
export const Image = styled.div`
  width: 174px;
  height: 174px;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const Info = styled.div`
  position: relative;
  padding: 15px 30px;
  width: 75%;
  height: 100%;
  * {
    font-weight: 400;
  }
`;
export const Name = styled.h3`
  font-size: 24px;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 4px;
`;
export const Color = styled.h5`
  font-size: 14px;
  color: #aaa;
`;
const Size = styled.h4`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  font-size: 16px;
  color: #666;
`;
export const Price = styled.h3`
  position: absolute;
  bottom: 15px;
  font-size: 22px;
  color: ${(props) => props.theme.bgColor};
`;
export const DeleteButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    &:hover {
      filter: invert(0.3);
    }
  }
`;
