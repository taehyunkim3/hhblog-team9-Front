import { styled } from "styled-components";

export const StNavBar = styled.div`
  height: 6rem;
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  border-bottom: 1px solid #e0e0e0;
  top: 0;
  position: ${(prop) => (prop.position === "fixed" ? "fixed" : "static")};

  background-color: #f6f5f7;
  opacity: 0.7;
  .profile {
    font-size: 2rem;
    cursor: pointer;
    margin-right: 0;
  }
  .addTable {
    font-size: 2rem;
    cursor: pointer;
    margin-left: auto;
    margin-right: 0;
  }
`;
export const StTitle = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: red;
  cursor: pointer;
`;
