import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

// const baseUrl = "http://localhost:4000";
const baseUrl = "https://hangublog.store/api";


export const getDesks = async () => { // 목록
    const { data } = await axios.get(`${baseUrl}/desks`);
    console.log(data);
    return data;
}

// export const getDeskDetail = async (id) => { // 상세 JSOJSONSERVER용
//     const { data } = await axios.get(`${baseUrl}/11`);
//     return data[0];
// }
export const getDeskDetail = async (id) => { // 상세
    const { data } = await axios.get(`${baseUrl}/desks/${id}`);
    return data;
}

// export const postDesk = async ({ token, desk }) => { // 책상생성 fix
//     const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//     const { data } = await axios.post(`${baseUrl}/desks`, desk, sentToken);
//     return data;
// }
//아래는 ㅣㅈ울것
// const initialInput = {
//     name: "",
//     description: "",
//     deskImg: "",
//   };
export const postDesk = async ({ post }) => { // 사진전송추가
    const token = localStorage.getItem("token");

    console.log(post);
    const { path: profilePath } = await axios({
        method: "post",
        url: `${baseUrl}/file`,
        data: post.profile,
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
    });
    const { path: deskImgPath } = await axios({
        method: "post",
        url: `${baseUrl}/file`,
        data: post.deskImg,
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
    });
    const dataWithUrl = { ...post, "deskImg": deskImgPath, "profile": profilePath }
    const formedToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.post(`${baseUrl}/desks`, dataWithUrl, formedToken);
    return data;
}

// export const putModifyDesk = async ({ token, id, desk }) => { // 책상수정 fix
//     const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//     const { data } = await axios.put(`${baseUrl}/desks/${id}`, sentToken, desk);
//     return data;
// }
export const putModifyDesk = async ({ post, deskId }) => { // 사진전송추가 수정기능
    const token = localStorage.getItem("token");

    console.log(post);
    const { path: profilePath } = await axios({
        method: "post",
        url: `${baseUrl}/file`,
        data: post.profile,
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
    });
    const { path: deskImgPath } = await axios({
        method: "post",
        url: `${baseUrl}/file`,
        data: post.deskImg,
        headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
    });
    const dataWithUrl = { ...post, "deskImg": deskImgPath, "profile": profilePath }
    const formedToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.put(`${baseUrl}/desks/${deskId}`, dataWithUrl, formedToken);
    return data;
}

export const deleteDesk = async ({ token, id }) => { // 책상삭제 fix
    const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.delete(`${baseUrl}/desks/${id}`, sentToken);
    return data;
}



export const postSignUp = async (user) => { // 회원가입
    const { data } = await axios.post(`${baseUrl}/auth/signup`, user);
    return data;
}

export const postLogIn = async (user) => { // 로그인
    const { data } = await axios.post(`${baseUrl}/auth/login`, user);
    const result = await data.token.substring(6);
    return result;
}
// export const postLogIn = async (user) => { // 로그인 JSONSERVER용
//     const { data } = await axios.get(`${baseUrl}/login`, user);
//     console.log(data);
//     const result = await data.token.substring(6);
//     return { 'token': result, user: data.user };
// }

export const postSignOut = async (token) => { // 로그아웃
    const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.post(`${baseUrl}/auth/logout`, sentToken);
    return data;
}

// export const getMyInfo = async (token) => { //JSONSERVER용
//     console.log(token + '토큰');
//     const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//     const { data } = await axios.get(`${baseUrl}/user`, sentToken);
//     return data;
// }
export const getMyInfo = async (token) => { // 내 정보fix
    console.log(token + '토큰');
    const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.get(`${baseUrl}/desks/user`, sentToken);
    return data;
}

