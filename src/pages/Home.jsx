import React from "react";
import Desk1 from "../components/Desks/Desk1";
import { styled } from "styled-components";
import { initialState } from "../db/deskDB";
import NavBar from "../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../lib/img/deck.png";

const StHome = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  background-image: url(${backgroundImage});
  background-repeat: repeat;

  min-height: 100vh;
  height: 100%;
  padding-bottom: 130px;
`;
const StDesksBox = styled.div`
  width: 1060px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;
//width:1060px 로 바꿀것. 1070px는 보더때문에 넣은 테스트용임.

const StDeskWrapper = styled.div`
  flex: 0 0 20%; /* Flex grow, shrink, basis. This makes sure that exactly 5 items fit in a row */
  padding: 10px;
  &:nth-child(5n + 2),
  &:nth-child(5n + 4) {
    /* Selects every 2nd and 4th element in every row of 5 */
    transform: translateY(130px);
  }
`;

const Home = () => {
  return (
    <StHome>
      <NavBar page="home" />
      <StDesksBox>
        {initialState.map((desk) => {
          return (
            <StDeskWrapper key={desk.id}>
              <Desk1 name={desk.name} image={desk.image} id={desk.id} />
            </StDeskWrapper>
          );
        })}
      </StDesksBox>
    </StHome>
  );
};

export default Home;
