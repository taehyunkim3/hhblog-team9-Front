import Desk1 from "../../components/Desks/Desk1";
import NavBar from "../../components/NavBar/NavBar";
import { StDeskWrapper, StDesksBox, StHome } from "./HomeStyle";
import { useQuery } from "@tanstack/react-query";
import { getDesks, getMyInfo } from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../../redux/reducers/userInfo";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [desks, setDesks] = useState([]);
  //
  const { isLoading, isError, error } = useQuery(["desks"], getDesks, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("🐱" + data);
      setDesks(data);
    },
    onError: (e) => {
      console.log("🫠" + e);
    },
    retry: 1,
  });
  //

  return (
    <StHome>
      <NavBar position="static" page="home" />
      <StDesksBox>
        {isError && <h1>An error has occurred: {error.message}</h1>}
        {isLoading && !isError && <h1>Loading...</h1>}
        {!isLoading &&
          desks?.map((desk) => {
            return (
              <StDeskWrapper key={desk.id}>
                <Desk1 name={desk.name} image={desk.profile} id={desk.deskId} />
              </StDeskWrapper>
            );
          })}
      </StDesksBox>
    </StHome>
  );
};

export default Home;
