import NavBar from "../../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";

import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";

import {
  StDeskDetailBg,
  StDeskDetailBody,
  StHoverShadow,
} from "./DeskDetailStyle";
import { getDeskDetail } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import MonitorSvg from "../../components/Monitor/MonitorSvg";

const DeskDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery(["desks", id], () =>
    getDeskDetail(id)
  );

  const deskId = data && data.deskId;
  const name = data && data.name;
  const deskImg = data && data.deskImg;
  const description = data && data.description;
  if (isLoading) return "Loading...";
  if (isError) return `An error has occurred: ${error.message}`;
  console.log(data);
  return (
    <StDeskDetailBg>
      <NavBar page="home" />
      <StDeskDetailBody>
        <StHoverShadow position={"left"} onClick={() => navigate(`/`)} />
        <TbArrowBackUp className="arrow left" />

        {/* <h2>교실로</h2> */}
        <div>
          <h3>"{name}님의 책상"</h3>

          <img src={deskImg} alt={`${name}님의 책상 사진입니다.`} />
          <p>"{description}"</p>
        </div>

        {/* <h2>방으로</h2> */}
        <MdOutlineMarkUnreadChatAlt className="arrow right" />
        <StHoverShadow
          position={"right"}
          onClick={() => alert("구현 준비중 입니다🦊")}
          // onClick={() => navigate(`/deskdetail/${deskId}/room`)}
        />
      </StDeskDetailBody>
    </StDeskDetailBg>
  );
};

export default DeskDetail;
