// import NavBar from "../../components/NavBar/NavBar";

// import Desk1Svg from "../../components/Desks/Desk1Svg";
// import { StCreateDesk, AutoUrl } from "./CreateDeskStyle";
// import { useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getDesks, postDesk } from "../../services/api";
// import { useNavigate, useParams } from "react-router-dom";
// import { queryClient } from "../../routes/Router";
// const initialInput = {
//   name: "",
//   description: "",
//   profile: "",
//   deskImg: "",
// };
// const CreateDesk = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [input, setInput] = useState(initialInput);
//   const [autoUrlEnabled, setAutoUrlEnabled] = useState(false);
//   const [isAlert, setIsAlert] = useState(false);
//   console.log(params.deskId);
//   useQuery(["desks"], getDesks, {
//     enabled: !!params.deskId,
//     staleTime: 60 * 1000 * 30, // 30분, default >> 0
//     cacheTime: 60 * 30 * 1000, // 30분, default >> 5분
//     refetchOnWindowFocus: false,
//     retry: 2,
//   });

//   const mutation = useMutation({
//     mutationFn: postDesk,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["desks"] });
//       navigate("/");
//     },
//     onError: (error) => {
//       isAlert(error);
//     },
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setInput({
//       ...input,
//       [name]: value,
//     });
//     setIsAlert(false);
//   };

//   const onAutoUrlChange = (e) => {
//     setAutoUrlEnabled(e.target.checked);
//     if (e.target.checked) {
//       setInput({
//         ...input,
//         profile: "https://source.unsplash.com/random",
//         deskImg: "https://source.unsplash.com/random",
//       });
//     } else {
//       setInput({
//         ...input,
//         profile: "",
//         deskImg: "",
//       });
//     }
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     if (input.name && input.description && input.profile && input.deskImg) {
//       mutation.mutate(input);
//       setInput(initialInput);
//       setIsAlert(false);
//     } else {
//       setIsAlert(true);
//     }
//   };

//   return (
//     <>
//       <NavBar page="create" />
//       <StCreateDesk>
//         <Desk1Svg></Desk1Svg>

//         {isAlert ? (
//           <h1>모든 항목을 입력해주세요.</h1>
//         ) : (
//           <h1>Create your own desk</h1>
//         )}

//         <form onSubmit={onSubmitHandler}>
//           <input
//             type="text"
//             name="name"
//             value={input.name}
//             onChange={onChangeHandler}
//             placeholder="이름"
//           />
//           <textarea
//             type="text"
//             name="description"
//             value={input.description}
//             onChange={onChangeHandler}
//             placeholder="나의 책상 소개"
//           />

//           <input
//             type="text"
//             name="profile"
//             value={input.profile}
//             onChange={onChangeHandler}
//             placeholder="프로필사진 url"
//           />
//           <input
//             type="text"
//             name="deskImg"
//             value={input.deskImg}
//             onChange={onChangeHandler}
//             placeholder="책상사진 url"
//           />

//           <button type="submit">
//             {" "}
//             {isAlert ? " 모든 항목을 입력해주세요." : "Create!"}
//           </button>
//         </form>
//         <AutoUrl>
//           <label htmlFor="autoUrl">자동으로 이미지 생성하기</label>
//           <input
//             name="autoUrl"
//             id="autoUrl"
//             type="checkbox"
//             checked={autoUrlEnabled}
//             onChange={onAutoUrlChange}
//           />
//         </AutoUrl>
//       </StCreateDesk>
//     </>
//   );
// };

// export default CreateDesk;

/**
 *
 *
 *
 */
import NavBar from "../../components/NavBar/NavBar";
import Desk1Svg from "../../components/Desks/Desk1Svg";
import { StCreateDesk } from "./CreateDeskStyle";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDeskDetail, getDesks, postDesk } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient } from "../../routes/Router";
import imageCompression from "browser-image-compression";
import { useSelector } from "react-redux";

const initialInput = {
  name: "",
  description: "",
  profile: "",
  deskImg: "",
};
const CreateDesk = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialInput);
  const [isAlert, setIsAlert] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const fileUpload = useRef();
  const profileUpload = useRef();

  const deskId = useSelector((state) => state.userInfo.deskId);
  console.log("deskId" + deskId);
  const postDeskQuery = useMutation({
    mutationFn: postDesk,
    onSuccess: () => {
      alert("등록완료~");
      queryClient.invalidateQueries({ queryKey: ["desks"] });
      navigate("/");
    },
    onError: (error) => {
      isAlert(error);
    },
  });
  const modifyDeskQuery = useMutation({
    mutationFn: postDesk,
    onSuccess: () => {
      alert("등록완료~");
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
    console.log("onChangeImage" + imageFile);
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const imageUrl = URL.createObjectURL(compressedFile);
      console.log("compressed" + imageUrl + compressedFile);
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
    console.log("onChangeImage" + imageFile);
    try {
      const compressedFile = await imageCompression(imageFile, profileOptions);
      const imageUrl = URL.createObjectURL(compressedFile);
      console.log("compressed" + imageUrl + compressedFile);
      setProfileUrl(imageUrl);
      setInput({ ...input, profile: compressedFile });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (input.name && input.description && input.deskImg && input.profile) {
      if (deskId === null) {
        postDeskQuery.mutate(input);
      } else {
        modifyDeskQuery.mutate(input, deskId);
      }
      setInput(initialInput);
      setIsAlert(false);
    } else {
      setIsAlert(true);
    }
  };

  useQuery(["desks"], () => getDeskDetail(deskId), {
    enabled: !!deskId,
    refetchOnWindowFocus: false,
    retry: 2,
    onSuccess: (data) => {
      console.log(data);
      setInput(data);
    },
    onError: (e) => {
      console.log("데이터 불러오기 실패");
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

  return (
    <>
      <NavBar page="create" />
      <StCreateDesk>
        <Desk1Svg></Desk1Svg>

        {isAlert ? (
          <h1>모든 항목을 입력해주세요.</h1>
        ) : (
          <h1>Create your own desk</h1>
        )}

        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={onChangeHandler}
            placeholder="이름"
          />
          <textarea
            type="text"
            name="description"
            value={input.description}
            onChange={onChangeHandler}
            placeholder="나의 책상 소개"
          />
          <h2>책상사진</h2>
          <input type="file" ref={fileUpload} onChange={onChangeImage} />
          <h2>프로필사진</h2>
          <input type="file" ref={profileUpload} onChange={onChangeProfile} />

          {fileUrl && (
            <>
              {" "}
              <h2>책상사진</h2>
              <img
                src={fileUrl}
                alt="selected"
                style={{ width: "200px", height: "200px" }}
              />
            </>
          )}

          {profileUrl && (
            <>
              {" "}
              <h2>프로필사진</h2>
              <img
                src={profileUrl}
                alt="selected"
                style={{ width: "200px", height: "200px" }}
              />
            </>
          )}

          <button type="submit">
            {isAlert ? " 모든 항목을 입력해주세요." : "Create!"}
          </button>
        </form>
      </StCreateDesk>
    </>
  );
};

export default CreateDesk;
