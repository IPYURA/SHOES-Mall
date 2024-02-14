import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LikesItem from "../components/LikesItem";
import { Container, Title, AllDelete, NoItem } from "./Cart";
import { addLikesAction } from "../redux/actions/addLikesAction";

const Likes = () => {
  const likeList = useSelector((state) => state.likes.likeList);
  const dispatch = useDispatch();

  const onClickDeleteAll = () => {
    dispatch(addLikesAction.deleteAllLikes());
  };
  return (
    <Container>
      <Title>
        찜목록
        {likeList.length === 0 ? (
          ""
        ) : (
          <AllDelete onClick={onClickDeleteAll}>전체 삭제</AllDelete>
        )}
      </Title>

      {likeList.length === 0 ? (
        <NoItem>찜목록에 상품이 없습니다.</NoItem>
      ) : (
        likeList.map((item, index) => <LikesItem key={index} info={item} />)
      )}
    </Container>
  );
};

export default Likes;
