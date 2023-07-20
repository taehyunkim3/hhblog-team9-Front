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
  h1 {
  color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  form input{
    width: 70vw;
    max-width: 30rem;
    height: 4rem;
    border-radius: 1rem;
  
    padding: 0.8rem;
    font-size: 1.5rem;
  }
  form textarea {
    height: 10rem;
  }
  form input::placeholder {
    padding: 0 1rem;
    font-size: 1rem;
  }


  }
`;
