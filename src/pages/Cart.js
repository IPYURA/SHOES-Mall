import React from "react";
import styled from "styled-components";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addCartAction } from "../redux/actions/addCartAction";
import { priceWithCommas } from "../util";

const Cart = () => {
  const { cartList, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onClickDeleteAll = () => {
    dispatch(addCartAction.deleteAll());
  };

  return (
    <Container>
      <Title>
        장바구니
        {cartList.length === 0 ? (
          ""
        ) : (
          <AllDelete onClick={onClickDeleteAll}>전체 삭제</AllDelete>
        )}
      </Title>

      {cartList.length === 0 ? (
        <NoItem>장바구니가 비었습니다.</NoItem>
      ) : (
        cartList.map((item, index) => <CartItem key={index} info={item} />)
      )}

      {cartList.length === 0 ? (
        ""
      ) : (
        <ButtonWrap>
          <TotalPrice>총 {priceWithCommas(totalPrice)} ₩</TotalPrice>
          <PurchaseButton>구매하기</PurchaseButton>
        </ButtonWrap>
      )}
    </Container>
  );
};

export default Cart;

export const Container = styled.div`
  position: relative;
  width: 1140px;
  margin: 0 auto;
  padding: 40px 0;
  min-height: calc(100vh - 244px);
`;
export const Title = styled.h2`
  position: relative;
  font-size: 40px;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 50px;
`;
export const AllDelete = styled.button`
  position: absolute;
  right: 0;
  bottom: -30px;
  padding: 5px 10px;
  font-size: 12px;
  color: #333;
  border: none;
`;
export const NoItem = styled.h3`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
const ButtonWrap = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin-bottom: 70px;
`;
const TotalPrice = styled.span`
  font-size: 24px;
  padding: 7px;
  position: absolute;
  right: 170px;
  bottom: -2px;
`;
const PurchaseButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 7px 35px;
  background: ${(props) => props.theme.bgColor};
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background: #333;
  }
`;
