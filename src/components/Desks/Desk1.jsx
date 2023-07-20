import React, { useState } from "react";
import Desk1Svg from "./Desk1Svg";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StDesk = styled.div`
  height: 13rem;
  width: 12rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.7);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: rgba(100, 100, 100, 0.7);
    & .name {
      color: rgba(255, 255, 255, 1);
    }
  }
  .desk {
    bottom: 0;
  }
`;
const StName = styled.div`
  width: 80%;
  height: 2rem;

  margin-bottom: 0.7rem;
  margin-top: 0.3rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0);

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  white-space: nowrap;  /* 텍스트를 한 줄로 처리하게 함 */
  overflow: hidden;  /* 넘치는 부분을 숨김 */
  text-overflow: ellipsis;  /* 넘치는 부분을 "
  p {
    font-weight: 600;
  }
`;
const initialImage = "https://i.imgur.com/1QZzXQK.png";
const Desk1 = ({ id, image = initialImage, name = "noname" }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  return (
    <StDesk
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        navigate(`/deskdetail/${id}`);
      }}
    >
      <StName isHovered={isHover} className="name">
        <p>{name}</p>
      </StName>
      <Desk1Svg
        isHovered={isHover}
        width="10rem"
        height="10rem"
        IMAGEURL={image}
        className="desk"
      />
    </StDesk>
  );
};

export default Desk1;
