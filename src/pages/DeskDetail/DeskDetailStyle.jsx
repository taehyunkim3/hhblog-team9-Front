import { styled } from "styled-components";

export const StDeskDetailBg = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-bottom: 130px;

  background: rgb(67, 67, 67);
  background: radial-gradient(
    circle,
    rgba(67, 67, 67, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;

export const StDeskDetailBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;

  gap: 1rem;
  color: #ffffff;
  img {
    max-width: 80vw;
    max-height: 70vh;
    width: auto;
    height: auto;
    // box-shadow: 0px 0px 50px 9px rgba(200, 200, 200, 0.3);
  }
  p {
    font-size: 2rem;
    margin: 1rem;
  }
  .divider {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }
  .arrow {
    color: grey;
    font-size: 2rem;
    margin: 3rem;
    position: absolute;
  }
  .right {
    right: 0;
  }
  .left {
    left: 0;
  }
  h2 {
    font-size: 1.4rem;
    width: 20%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  h3 {
    color: grey;
  }
`;

export const StHoverShadow = styled.div`

  position: absolute;
  height: 100%;
  padding-bottom:130px;
  ${(prop) => (prop.position === "right" ? "right:0" : "left: 0")};
  max-width: 20rem;
  background: radial-gradient(ellipse farthest-corner at top ${(prop) =>
    prop.position === "right" ? "right" : "left"}, 
    rgba(140,140,140,0.5) 0%, ${(prop) =>
      prop.position === "right" ? "rgba(0,0,0,0) " : "rgba(0,0,0,0) "} 60%);
  opacity:0;
  transition: all .5s;
  &:hover { 
    opacity:1;
    );
  }
  cursor:pointer;
`;
export const StDesc = styled.div`
  font-family: "Gowun Batang", serif;
  margin-top: 1rem;
  line-height: 1.7;
  width: 70vw;
  height: 100%;
  border-radius: 1rem;
  padding: 2rem;
  font-size: 1.3rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ebebeb;
  @media (max-width: 820px) {
    font-size: 1rem;
  }
`;
