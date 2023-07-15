import React from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "../components/NavBar/NavBar";

const StRoom = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    font-size: 4rem;
  }
`;
const Room = () => {
  const { id } = useParams();
  return (
    <StRoom>
      <div>id: {id} 의 방</div>
      <Link to={"/"}>홈으로 돌아가기</Link>
    </StRoom>
  );
};

export default Room;
