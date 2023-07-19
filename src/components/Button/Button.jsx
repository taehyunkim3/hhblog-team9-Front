import React from "react";
import { styled } from "styled-components";

const StButton = styled.button`
  width: 20rem;
  height: 3rem;
  border-radius: 1rem;
  border: 1px solid #e0e0e0;
  background-color: #f6f5f7;
  font-size: 1.5rem;
  margin: 0.5rem;

  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #fed84a;
  }
`;

const Button = ({ type = "button", onClick, children }) => {
  return (
    <>
      <StButton type={type} onClick={onClick}>
        {children}
      </StButton>
    </>
  );
};

export default Button;
