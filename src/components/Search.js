import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAction } from "../redux/actions/productAction";
import searchIcon from "../imgs/icon-search.png";
import heartIcon from "../imgs/icon-heart.png";
import cartIcon from "../imgs/icon-cart.png";

const Search = () => {
  const authentication = useSelector((state) => state.auth.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [nowValue, setNowValue] = useState();

  const onChangeInputValue = (e) => {
    setNowValue(e.target.value);
  };
  const onClickSearchName = () => {
    dispatch(productAction.searchProduct(nowValue));
    nowValue === "" ? navigate("/") : navigate(`/?search=${nowValue}`);
  };
  const onKeyDownEnter = (event) => {
    if (event.key === "Enter") {
      dispatch(productAction.searchProduct(nowValue));
      nowValue === "" ? navigate("/") : navigate(`/?search=${nowValue}`);
    }
  };

  return (
    <Container>
      {location.pathname === "/" || location.pathname === "/?search" ? (
        <InputBox>
          <Input
            value={nowValue || ""}
            onChange={onChangeInputValue}
            onKeyDown={onKeyDownEnter}
            placeholder="검색"
          />
          <SearchButton onClick={onClickSearchName}>
            <img src={searchIcon} alt="search" />
          </SearchButton>
        </InputBox>
      ) : (
        ""
      )}

      <IconBox>
        <Heart
          onClick={() =>
            authentication
              ? navigate("/likes")
              : navigate("/login", { state: { goBackBan: false } })
          }
        >
          <img src={heartIcon} alt="heart" />
        </Heart>
        <Cart
          onClick={() =>
            authentication
              ? navigate("/cart")
              : navigate("/login", { state: { goBackBan: false } })
          }
        >
          <img src={cartIcon} alt="cart" />
        </Cart>
      </IconBox>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  position: relative;
  width: 1180px;
  height: 56px;
  margin: 0 auto;
  padding: 4px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const InputBox = styled.div`
  width: 1046px;
  height: 46px;
  display: flex;
  align-items: center;
  padding-right: 2px;
  background: #fff;
`;
const Input = styled.input`
  width: 1002px;
  height: 42px;
  padding: 0 60px 0 8px;
  font-size: 18px;
  position: relative;
  border: none;
  outline: none;
`;
const ButtonStyle = styled.button`
  width: 42px;
  height: 42px;
  background: ${(props) => props.theme.bgColor};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchButton = styled(ButtonStyle)`
  img {
    width: 24px;
    heigth: 24px;
  }
  &:hover {
    background: #666;
  }
`;
const IconBox = styled.div`
  position: absolute;
  right: 20px;
  width: 86px;
  height: 100%;
  display: flex;
  gap: 2px;
  align-items: center;
`;
const Heart = styled(ButtonStyle)`
  img {
    width: 26px;
  }
  &:hover img {
    filter: invert(0.5);
  }
`;
const Cart = styled(ButtonStyle)`
  background: ${(props) => props.theme.bgColor};
  img {
    width: 23px;
  }
  &:hover img {
    filter: invert(0.5);
  }
`;
