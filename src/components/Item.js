import React, { useState, useEffect } from "react";
import styled from "styled-components";
import heart from "../imgs/icon-heart.png";
import redHeart from "../imgs/icon-liked-inverted.png";
import { useNavigate } from "react-router-dom";
import NewBadge from "./NewBadge";
import PopularityBadge from "./PopularityBadge";
import { priceWithCommas } from "../util";
import { addLikesAction } from "../redux/actions/addLikesAction";
import { useDispatch, useSelector } from "react-redux";

const Item = ({ info }) => {
  const {
    id,
    name,
    img,
    price,
    category,
    color,
    popularity,
    new: isNew,
  } = info;
  const likeList = useSelector((state) => state.likes.likeList);
  const authentication = useSelector((state) => state.auth.authentication);

  const [product, setProduct] = useState(undefined);
  const [liked, setLiked] = useState(false);
  const [included, setIncluded] = useState(undefined);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    setProduct(info);
    likeList.some((ele) => ele.id === info.id)
      ? setLiked(true)
      : setLiked(false);
  }, []);

  useEffect(() => {
    likeList.some((ele) => ele.id === info.id)
      ? setIncluded(true)
      : setIncluded(false);
  }, [likeList]);

  const showDetail = () => {
    navigate(`/item/${id}`);
  };

  const onClickAddLikes = () => {
    if (authentication) {
      setLiked(!liked);
      dispatch(addLikesAction.manageLikes(product, !liked));
    } else {
      navigate("/login", { state: { goBackBan: false } });
    }
  };

  return (
    <Container>
      <ImgArea onClick={showDetail}>
        <img src={img} alt={name} />
        <Badges>
          {isNew ? <NewBadge /> : ""}
          {popularity ? <PopularityBadge /> : ""}
        </Badges>
      </ImgArea>
      <TextArea>
        <Name onClick={showDetail}>{name}</Name>
        {included || liked ? (
          <Heart onClick={onClickAddLikes} src={redHeart} alt="filled-heart" />
        ) : (
          <Heart onClick={onClickAddLikes} src={heart} alt="heart" />
        )}
        <Category>{category}</Category>
        <Colors>{color}</Colors>
        <Price>₩ {priceWithCommas(price)}</Price>
      </TextArea>
    </Container>
  );
};

export default Item;

const Container = styled.div`
  width: 260px;
  height: 390px;
  background: #fff;
  border: 1px solid #ccc;
`;
const ImgArea = styled.div`
  width: 100%;
  height: 260px;
  background: #eee;
  position: relative;
  display: grid;
  place-items: center;
  img {
    width: 80%;
    height: 80%;
    cursor: pointer;
    object-fit: contain;
  }
`;
const Badges = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 50%;
  height: 26px;
  display: flex;
`;
const TextArea = styled.div`
  width: 100%;
  height: 130px;
  padding: 16px;
  position: relative;
`;
const Name = styled.h3`
  font-size: 16px;
  margin-bottom: 11px;
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;
const Category = styled.h5`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.subTextColor};
  margin-bottom: 3px;
`;
const Colors = styled.h5`
  font-size: 11px;
  font-weight: 400;
  color: ${(props) => props.theme.subTextColor};
  margin-bottom: 6px;
`;
const Price = styled.h4`
  font-size: 14px;
  color: ${(props) => props.theme.bgColor};
`;
const Heart = styled.img`
  position: absolute;
  right: 16px;
  top: 20px;
  width: 21px;
  height: 18px;
  filter: invert(0.9);
  cursor: pointer;
`;
