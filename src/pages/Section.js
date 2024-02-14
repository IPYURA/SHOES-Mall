import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productAction } from "../redux/actions/productAction";
import Item from "../components/Item";
import Loading from "./Loading";

const Section = () => {
  const { productList, searchList, inputText } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const [query, setQuery] = useSearchParams();

  const getProducts = async () => {
    const searchQuery = query.get("q") || "";
    dispatch(productAction.getProduct(searchQuery));
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  if (productList.length === 0) {
    return <Loading />;
  } else if (searchList.length === 0 && inputText !== "") {
    return (
      <Container>
        <Message>"{inputText}" 에 대한 검색결과가 없습니다.</Message>
      </Container>
    );
  } else {
    return (
      <Container>
        {searchList.length === 0
          ? productList.map((item) => <Item key={item.id} info={item} />)
          : searchList.map((item) => <Item key={item.id} info={item} />)}
      </Container>
    );
  }
};

export default Section;

const Container = styled.div`
  width: 1140px;
  min-height: calc(100vh - 244px);
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 33px;
`;
const Message = styled.div`
  width: 100%;
  min-height: 100%;
  display: grid;
  place-items: center;
  font-size: 22px;
`;
