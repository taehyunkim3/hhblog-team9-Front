// import NavBar from "../../components/NavBar/NavBar";
// import Desk1Svg from "../../components/Desks/Desk1Svg";
// import { StCreateDesk } from "./CreateDeskStyle";
// import { useState, useRef } from "react";
// import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
// import { getDesks, postDesk } from "../../services/api";
// import { useNavigate, useParams } from "react-router-dom";
// import { queryClient } from "../../routes/Router";
// import imageCompression from "browser-image-compression";
// import { S3 } from "aws-sdk";
// // import S3upload from "react-aws-s3";
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
//   const [isAlert, setIsAlert] = useState(false);
//   const [fileUrl, setFileUrl] = useState(null);
//   const fileUpload = useRef();
//   console.log("env" + process.env.REACT_APP_BLOG_IMG_NAME);
//   const s3 = new S3({
//     accessKeyId: process.env.REACT_APP_BLOG_IMG_ACCESS_KEY,
//     secretAccessKey: process.env.REACT_APP_BLOG_IMG_SECRET_KEY,
//     region: process.env.REACT_APP_BLOG_IMG_REGION,
//   });

//   async function uploadFileToS3(file, fileName) {
//     const uploadParams = {
//       Bucket: process.env.REACT_APP_BLOG_IMG_NAME,
//       Key: fileName,
//       Body: file,
//       ACL: "public-read", // if you want the file to be publicly accessible
//     };

//     try {
//       const data = await s3.upload(uploadParams).promise();
//       return data.Location; // returns url of uploaded file
//     } catch (error) {
//       console.error("S3 upload error: ", error);
//     }
//   }
//   // window.Buffer = window.Buffer || require("buffer").Buffer;
//   // const config = {
//   //   bucketName: process.env.REACT_APP_BLOG_IMG_NAME,
//   //   region: process.env.REACT_APP_BLOG_IMG_REGION,
//   //   accessKeyId: process.env.REACT_APP_BLOG_IMG_ACCESS_KEY,
//   //   secretAccessKey: process.env.REACT_APP_BLOG_IMG_SECRET_KEY,
//   // };
//   // const ReactS3Client = new S3upload(config);

//   // 이미지 압축 옵션
//   const options = {
//     maxSizeMB: 1,
//     maxWidthOrHeight: 720,
//     useWebWorker: true,
//   };

//   const onChangeImage = async (e) => {
//     const imageFile = e.target.files[0];
//     try {
//       const compressedFile = await imageCompression(imageFile, options);
//       const imageUrl = URL.createObjectURL(compressedFile);
//       setFileUrl(imageUrl);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   // const onSubmitHandler = async (e) => {
//   //   e.preventDefault();
//   //   if (input.name && input.description && fileUpload.current.files[0]) {
//   //     const file = fileUpload.current.files[0];
//   //     const newFileName = fileUpload.current.files[0].name;

//   //     ReactS3Client.uploadFile(file, newFileName).then((data) => {
//   //       if (data.status === 204) {
//   //         let imgUrl = fileUrl; //data.location;
//   //         setInput({ ...input, deskImg: imgUrl });
//   //         setIsAlert(false);
//   //         mutation.mutate(input);
//   //         setInput(initialInput);
//   //       } else {
//   //         window.alert("사진 업로드에 오류가 있어요! 관리자에게 문의해주세요.");
//   //       }
//   //     });
//   //   } else {
//   //     setIsAlert(true);
//   //   }
//   // };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     if (input.name && input.description && fileUpload.current.files[0]) {
//       const file = fileUpload.current.files[0];
//       const newFileName = fileUpload.current.files[0].name;

//       const imgUrl = await uploadFileToS3(file, newFileName);
//       if (imgUrl) {
//         setInput({ ...input, deskImg: imgUrl });
//         setIsAlert(false);
//         mutation.mutate(input);
//         setInput(initialInput);
//       } else {
//         window.alert("사진 업로드에 오류가 있어요! 관리자에게 문의해주세요.");
//       }
//     } else {
//       setIsAlert(true);
//     }
//   };

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

//           <input type="file" ref={fileUpload} onChange={onChangeImage} />

//           {fileUrl && (
//             <img
//               src={fileUrl}
//               alt="selected"
//               style={{ width: "200px", height: "200px" }}
//             />
//           )}

//           <button type="submit">
//             {isAlert ? " 모든 항목을 입력해주세요." : "Create!"}
//           </button>
//         </form>
//       </StCreateDesk>
//     </>
//   );
// };

// export default CreateDesk;
