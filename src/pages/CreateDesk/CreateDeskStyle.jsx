// import { styled } from "styled-components";

// export const StCreateDesk = styled.div`

//   min-height: 100vh;
// background: rgb(67, 67, 67);
// background: radial-gradient(
//   circle,
//   rgba(67, 67, 67, 1) 0%,
//   rgba(0, 0, 0, 1) 100%
// );
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;

//   h1 {
//     font-size: 2rem;
//     font-weight: 700;
//     margin-bottom: 2rem;
//   }
//   form {
//     display: flex;
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//   }
//   form input,
//   form textarea {
//     width: 40rem;
//     height: 4rem;
//     border-radius: 1rem;
//     border: 1px solid #e0e0e0;
//     padding: 0.8rem;
//     font-size: 1.5rem;
//   }
//   form textarea {
//     height: 10rem;
//   }
//   form input::placeholder {
//     padding: 0 1rem;
//     font-size: 1rem;
//   }
//   form textarea::placeholder {
//     padding: 1rem 1rem;
//     font-size: 1rem;
//   }
//   form p {
//     font-size: 1rem;
//     color: red;
//     text-align: left;
//     margin-left: 2rem;
//     margin-right:auto;
//     margin-bottom:-.8rem;
//   }
//     form button {
//       width: 20rem;
//       height: 3rem;
//       border-radius: 1rem;
//       border: 1px solid #e0e0e0;
//       background-color: #f6f5f7;
//       font-size: 1.5rem;

//       cursor: pointer;
//       transition: all 0.1s ease-in-out;
//       &:hover {
//         background-color: #fed84a;
//       }
//     }
//   }
// `;

// export const AutoUrl = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;
//   margin: 2rem;
//   label {
//     font-size: 1.5rem;
//   }
//   input {
//     width: 2rem;
//     height: 2rem;
//   }
// `;

// export const StCreateDeskBody = styled.div`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;
// `;
import { styled } from "styled-components";

export const StCreateDesk = styled.div`
  background: rgb(67, 67, 67);
  background: radial-gradient(
    circle,
    rgba(67, 67, 67, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
`;

export const StCreateDeskBody = styled.div`
color: #b2b2b3ff;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;

  min-width:100vw;
  min-height: 100vh;
  padding: 1rem;
  padding-top: 4rem;

label {
  line-height: 2;
}

  h1 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-top:2rem;
    margin
  }

  form {
    display: flex;
    flex-direction: column;
    gap:1rem;
    justify-items: center;
    align-items: center;

    width: 100vw;
  }

  form input,
  form textarea {
    width:70vw;
    height: 4rem;
    border-radius: 1rem;
    border: 1px solid #e0e0e0;
    padding: 0.8rem;
    font-family: "Gowun Batang", serif;
    font-size: 1.3rem;
    background-color: rgba(255, 255, 255, 0.1);
    border:none;
  }
  form textarea {
    height: 20rem;
    margin-top: 1rem;
    line-height: 1.7;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.1);

  }

  div{
    display: flex;
     flex-direction: column;
 
    align-items: center;
    gap:2rem;
    

  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
    form{
      width: 100%;
      height: 85vh;
    }
    form textarea{
      height: 30vh;
      width: 48vw;
    }
    form input{
      width: 48vw;
    }
  }
  }
`;
