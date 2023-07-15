import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { initialState as mockDB } from "../db/deskDB";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
const StDeskDetailBg = styled.div`
  height: 100vh;
  width: 100%;
  padding-bottom: 130px;
  background-color: #0065a9;
`;

const StDeskDetailBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;

  gap: 1rem;
  color: #ffffff;
  img {
    max-width: 60%;
  }
  p {
    font-size: 2rem;
    margin: 1rem;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .arrow {
    font-size: 4rem;
    margin-right: 3rem;
  }
  h2 {
    font-size: 1.4rem;
    white-space: nowrap;
  }
`;

const StHoverShadow = styled.div`

  position: absolute;
  height: 100%;
  padding-bottom:130px;
  ${(prop) => (prop.position === "right" ? "right:0" : "left: 0")};
  max-width: 20rem;
  background: radial-gradient(ellipse farthest-corner at top ${(prop) =>
    prop.position === "right"
      ? "right"
      : "left"}, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%);
  opacity:0;
  transition: all .5s;
  &:hover { 
    opacity:1;
    );
  }
  cursor:pointer;
`;
const DeskDetail = () => {
  const { id } = useParams();
  console.log(id);
  const data = mockDB.find((data) => data.id === Number(id));
  console.log(data);
  const navigate = useNavigate();

  return (
    <StDeskDetailBg>
      <NavBar page="deskdetail" />
      <StDeskDetailBody>
        <StHoverShadow position={"left"} onClick={() => navigate(`/`)} />
        <AiOutlineArrowLeft className="arrow" />
        <h2>교실로</h2>
        <div>
          <p>?</p>
          <img src={data.image}></img>
          <p>{data.name}</p>
        </div>
        <h2>{data.name}님의 방으로</h2>
        <AiOutlineArrowRight className="arrow" />
        <StHoverShadow
          position={"right"}
          onClick={() => navigate(`/deskdetail/${id}/room`)}
        />
      </StDeskDetailBody>
    </StDeskDetailBg>
  );
};

export default DeskDetail;
