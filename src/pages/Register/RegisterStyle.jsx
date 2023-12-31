import { styled } from "styled-components";

export const StCreateDesk = styled.div`


  min-height: 100vh;
background: rgb(67, 67, 67);
background: radial-gradient(
  circle,
  rgba(67, 67, 67, 1) 0%,
  rgba(0, 0, 0, 1) 100%
);
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav{
    top:0;
  }
  span{
    font-size: .75rem;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 2rem;
    color: #ffffff;
  }
  form {
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  form input{
    max-width: 40rem;
    width:80vw;
    height: 4rem;
    border-radius: 1rem;
    border: 1px solid #e0e0e0;
    padding: 0.8rem;
    font-size: 1.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border:none;
  }

  form input::placeholder {
    padding: 0 1rem;
    font-size: 1rem;
  }
  label {
    line-height: 2;
  }
  

    form button {
      width: 20rem;
      height: 3rem;
      border-radius: 1rem;
      border: 1px solid #e0e0e0;
      background-color: #f6f5f7;
      font-size: 1.5rem;

      cursor: pointer;
      transition: all 0.1s ease-in-out;
      &:hover {
        background-color: #fed84a;
      }
    }
  }
`;

export const AutoUrl = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 2rem;
  label {
    font-size: 1.5rem;
  }
  input {
    width: 2rem;
    height: 2rem;
  }
`;
