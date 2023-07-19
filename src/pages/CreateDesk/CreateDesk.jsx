import NavBar from "../../components/NavBar/NavBar";
import Desk1Svg from "../../components/Desks/Desk1Svg";
import { StCreateDesk, StCreateDeskBody } from "./CreateDeskStyle";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteDesk,
  getDeskDetail,
  getDesks,
  postDesk,
  putModifyDesk,
} from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../../routes/Router";
import imageCompression from "browser-image-compression";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import MonitorSvg from "../../components/Monitor/MonitorSvg";

const initialInput = {
  description: "",
  profile: null,
  deskImg: null,
};

const CreateDesk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);
  const [isAlert, setIsAlert] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const fileUpload = useRef();
  const profileUpload = useRef();

  const deskId = useSelector((state) => state.userInfo.deskId);
  console.log(deskId);
  const postDeskQuery = useMutation({
    mutationFn: postDesk,
    onSuccess: () => {
      alert("등록완료🐼");
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      navigate("/");
    },
    onError: (error) => {
      isAlert(error);
    },
  });
  const modifyDeskQuery = useMutation({
    mutationFn: putModifyDesk,
    onSuccess: () => {
      alert("수정완료🐱");
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      navigate("/");
    },
    onError: (error) => {
      isAlert(error);
    },
  });
  // 이미지 압축 옵션
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true,
  };

  const onChangeImage = async (e) => {
    const imageFile = e.target.files[0];

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imageUrl = URL.createObjectURL(compressedFile);

      setFileUrl(imageUrl);
      setInput({ ...input, deskImg: compressedFile });
    } catch (error) {
      console.error(error);
    }
  };
  const profileOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 480,
    useWebWorker: true,
  };
  const onChangeProfile = async (e) => {
    const imageFile = e.target.files[0];

    try {
      const compressedFile = await imageCompression(imageFile, profileOptions);

      const imageUrl = URL.createObjectURL(compressedFile);

      setProfileUrl(imageUrl);
      setInput({ ...input, profile: compressedFile });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.description && input.deskImg && input.profile) {
      if (deskId) {
        modifyDeskQuery.mutate({ input, deskId });
      } else {
        postDeskQuery.mutate(input);
      }
      setInput(initialInput);
      setIsAlert(false);
    } else {
      setIsAlert(true);
    }
  };
  /***
   *
   *
   * 로그인할 경우
   */
  useQuery(["desks"], () => getDeskDetail(deskId), {
    enabled: !!deskId,
    refetchOnWindowFocus: false,
    retry: 2,
    onSuccess: (data) => {
      setInput(data);
      setProfileUrl(data.profile);
      setFileUrl(data.deskImg);
    },
    onError: (e) => {
      console.log("데이터 불러오기 실패");
      alert("서버 연결에 문제가 있나봐요!" + e);
    },
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
    setIsAlert(false);
  };

  const onDeleteHandler = async () => {
    const message = await deleteDesk(deskId);
    alert(message);
    queryClient.invalidateQueries({ queryKey: ["desks"] });
    navigate("/");
  };

  return (
    <>
      <StCreateDesk>
        <NavBar page="create" />
        <StCreateDeskBody>
          <div>
            {isAlert ? (
              <h1>모든 항목을 입력해주세요.</h1>
            ) : (
              <h1>Create your own desk</h1>
            )}
            {profileUrl && (
              <>
                <Desk1Svg
                  isHovered={isHover}
                  width="300px"
                  IMAGEURL={profileUrl}
                ></Desk1Svg>
              </>
            )}
            {fileUrl && (
              <>
                <img src={fileUrl} width="600px" />
              </>
            )}
          </div>
          <form onSubmit={onSubmitHandler}>
            <label>
              <p>나의 책상 소개</p>
              <textarea
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                type="text"
                name="description"
                value={input.description}
                onChange={onChangeHandler}
                placeholder="나의 책상 소개"
              />
            </label>
            <label>
              <p>프로필사진</p>
              <input
                type="file"
                ref={profileUpload}
                onChange={onChangeProfile}
              />
            </label>
            <label>
              <p>책상사진</p>
              <input type="file" ref={fileUpload} onChange={onChangeImage} />
            </label>
            <span
            // onMouseEnter={() => setIsHover(true)}
            // onMouseLeave={() => setIsHover(false)}
            >
              {isAlert && <p>모든 항목을 입력해주세요.</p>}
              <Button type="onSubmit">{deskId ? "수정하기" : "Create!"}</Button>

              {deskId && <Button onClick={onDeleteHandler}>삭제하기</Button>}
            </span>
          </form>
        </StCreateDeskBody>
      </StCreateDesk>
    </>
  );
};

export default CreateDesk;
