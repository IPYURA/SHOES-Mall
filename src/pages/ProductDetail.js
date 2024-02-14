import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCartAction } from "../redux/actions/addCartAction";
import { addLikesAction } from "../redux/actions/addLikesAction";
import { priceWithCommas } from "../util";
import SizeButton from "../components/SizeButton";
import NewBadge from "../components/NewBadge";
import PopularityBadge from "../components/PopularityBadge";
import Loading from "./Loading";
import heartIcon from "../imgs/icon-heart.png";
import redHeart from "../imgs/icon-liked-inverted.png";

const ProductDetail = () => {
  const likeList = useSelector((state) => state.likes.likeList);
  const authentication = useSelector((state) => state.auth.authentication);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(undefined);
  const [genderKids, setGenderKids] = useState("");
  const [sizeCategory, setSizeCategory] = useState([]);
  const [isUS, setIsUS] = useState(false);
  const [liked, setLiked] = useState(false);
  const [included, setIncluded] = useState(undefined);

  const sizeArray = {
    manKR: ["255", "260", "265", "270", "275", "280", "285", "290"],
    womanKR: ["230", "235", "240", "245", "250", "255", "260", "265"],
    manUS: ["7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    womanUS: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5"],
    kidsKR: ["230", "235", "240", "245", "250"],
    kidsUS: ["5", "5.5", "6", "6.5", "7"],
  };

  const changeSizeCategory = (category, isUS) => {
    switch (category) {
      case "남성 신발":
        isUS
          ? setSizeCategory(sizeArray.manUS)
          : setSizeCategory(sizeArray.manKR);
        break;
      case "여성 신발":
        isUS
          ? setSizeCategory(sizeArray.womanUS)
          : setSizeCategory(sizeArray.womanKR);
        break;
      case "그레이드 스쿨 신발":
        isUS
          ? setSizeCategory(sizeArray.kidsUS)
          : setSizeCategory(sizeArray.kidsKR);
        break;
      default:
        break;
    }
  };
  const onChangeNation = () => {
    changeSizeCategory(genderKids, !isUS);
    setIsUS(!isUS);
  };

  const getProductDetail = async () => {
    const url = `https://raw.githubusercontent.com/IPYURA/shopping-mall-data1/main/product.json`;
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setProduct(data[id]);
    setGenderKids(data[id].category);
    changeSizeCategory(data[id].category, isUS);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    if (product !== undefined) {
      if (included === undefined) {
        setIncluded(false);
      }
      likeList.some((ele) => ele.id === product.id)
        ? setIncluded(true)
        : setIncluded(false);
      likeList.some((ele) => ele.id === product.id)
        ? setLiked(true)
        : setLiked(false);
    }
  }, [product]);

  if (loading || product === undefined) {
    return <Loading />;
  }
  const { name, img, price, category, popularity, new: isNew } = product;

  const onClickSizeButton = (e) => {
    setProduct({ ...product, selectedSize: e.target.innerHTML });
  };

  const onClickAddToCart = () => {
    if (authentication) {
      Object.keys(product).includes("selectedSize")
        ? addToCart()
        : alert("사이즈를 선택해주세요.");
    } else {
      navigate("/login", { state: { goBackBan: false } });
    }
  };

  const addToCart = () => {
    dispatch(addCartAction.addCart(product));
    alert(`장바구니에 "${product.name}" 이(가) 담겼습니다.`);
    navigate("/");
  };

  const onClickAddLikes = () => {
    if (authentication) {
      if (liked === true && included === true) {
        setIncluded(false);
        setLiked(false);
      } else {
        setIncluded(true);
        setLiked(true);
      }
      dispatch(addLikesAction.manageLikes(product, !liked));
    } else {
      navigate("/login", { state: { goBackBan: false } });
    }
  };

  return (
    <Wrap>
      <Container>
        <Image>
          <img src={img} alt={name} />
        </Image>
        <TextArea>
          <BadgeWrap>
            {isNew ? <NewBadge /> : ""}
            {popularity ? <PopularityBadge /> : ""}
            <Heart onClick={onClickAddLikes}>
              {liked && included ? (
                <img src={redHeart} alt="heart" />
              ) : (
                <img src={heartIcon} alt="redheart" />
              )}
            </Heart>
          </BadgeWrap>
          <Name>{name}</Name>
          <Category>{category}</Category>
          <Price>₩ {priceWithCommas(price)}</Price>
          <select
            onChange={onChangeNation}
            value={isUS ? "US" : "KR"}
            name="size"
            style={{ width: "100%", marginBottom: "40px" }}
          >
            <option value="KR">KR</option>
            <option value="US">US</option>
          </select>
          <SizeList>
            {sizeCategory.map((size) => (
              <SizeButton
                key={size}
                onClick={onClickSizeButton}
                size={size}
                selected={product.selectedSize === size ? true : false}
              />
            ))}
          </SizeList>
          <AddCartButton onClick={onClickAddToCart}>
            장바구니에 추가
          </AddCartButton>
        </TextArea>
      </Container>
    </Wrap>
  );
};

export default ProductDetail;

const Wrap = styled.div`
  width: 100%;
  min-height: 640px;
  height: calc(100vh - 244px);
  padding: 20px 0;
  display: grid;
  place-items: center;
`;
const Container = styled.div`
  border: 1px solid #ccc;
  width: 1140px;
  height: 600px;
  display: flex;
`;
const Image = styled.div`
  width: 774px;
  height: 100%;
  background: #eee;
  display: grid;
  place-items: center;
  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }
`;
const TextArea = styled.div`
  width: 366px;
  height: 100%;
  padding: 20px;
  background: #fff;
`;
const BadgeWrap = styled.div`
  position: relative;
  width: 100%;
  height: 26px;
  margin-bottom: 5px;
  display: flex;
  gap: 5px;
`;
const Heart = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 22px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    filter: invert(0.9);
  }
`;
const Name = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 5px;
`;
const Category = styled.h5`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 32px;
`;
const Price = styled.h3`
  font-size: 26px;
  margin-bottom: 40px;
`;
const SizeList = styled.form`
  width: 100%;
  height: 106px;
  margin-bottom: 65px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const AddCartButton = styled.button`
  width: 100%;
  color: #fff;
  background: ${(props) => props.theme.bgColor};
  border: none;
  border-radius: 4px;
  padding: 10px;
`;
