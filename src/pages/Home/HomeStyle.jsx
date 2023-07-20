import { styled } from "styled-components";
import backgroundImage from "../../lib/img/deck.png";
import NavBar from "../../components/NavBar/NavBar";

export const StHome = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  background-image: url(${backgroundImage});
  background-repeat: repeat;

  min-height: 100vh;
  height: 100%;
  padding-bottom: 130px;
`;

export const StDesksBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 640px) {
    width: 640px;
  }
  @media (min-width: 1060px) {
    width: 1060px;
  }
  @media (min-width: 1480px) {
    width: 1530px;
  }
`;

export const StDeskWrapper = styled.div`
  flex: 0 0 50%; /* Flex grow, shrink, basis. This makes sure that exactly 5 items fit in a row */
  padding: 10px;


  @media (min-width: 640px) {
    flex: 0 0 33.3%;
    &:nth-child(3n + 2){
      transform: translateY(130px);
  }
  @media (min-width: 1060px) {
    flex: 0 0 20%; /* Flex grow, shrink, basis. This makes sure that exactly 5 items fit in a row */

    &:nth-child(3n + 2){
      transform: none;
  }
    &:nth-child(5n + 2),
    &:nth-child(5n + 4) {
      transform: translateY(130px);
    }
  }
  @media (min-width: 1480px) {
    flex: 0 0 14%; 
    &:nth-child(5n + 2),
    &:nth-child(5n + 4) {
      transform:none;
    }
  &:nth-child(7n + 2),
  &:nth-child(7n + 4),
  &:nth-child(7n + 6) {
    transform: translateY(130px);
  }
}
`;
