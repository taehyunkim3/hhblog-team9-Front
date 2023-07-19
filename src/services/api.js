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
export const postDesk = async (post) => { // 사진전송추가
    const token = localStorage.getItem("token");
    console.log('🐹게시요청');

    console.log("postDesk" + JSON.stringify(post.profile));
    const profileExt = post.profile.name.split('.').pop();
    const deskImgExt = post.deskImg.name.split('.').pop();


    const formProfileData = new FormData();
    formProfileData.append('file', post.profile, `profile.${profileExt}`)
    const formDeskData = new FormData();
    formDeskData.append('file', post.deskImg, `desk.${deskImgExt}`)
    const profileData = await axios({
        method: "post",
        url: `${baseUrl}/file`,
        data: formProfileData,
        headers: { "Authorization": `Bearer ${token}` }
    });
    const deskData = await axios({
        method: "post",
        url: `${baseUrl}/file`,
        data: formDeskData,
        headers: { "Authorization": `Bearer ${token}` }
    });
    console.log(JSON.stringify(profileData) + "4234234234" + deskData.data.path)
    const dataWithUrl = { ...post, deskImg: deskData.data.path, profile: profileData.data.path }
    const formedToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.post(`${baseUrl}/desks`, dataWithUrl, formedToken);
    return data;
}

// export const putModifyDesk = async ({ token, id, desk }) => { // 책상수정 fix
//     const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
//     const { data } = await axios.put(`${baseUrl}/desks/${id}`, sentToken, desk);
//     return data;
// }
export const putModifyDesk = async ({ input, deskId }) => {
    const token = localStorage.getItem("token");
    console.log('🐹수정요청' + deskId);

    let profilePath;
    let deskImgPath;

    if (typeof input.profile === "object") {
        const profileExt = input.profile.name.split('.').pop();
        const formProfileData = new FormData();
        formProfileData.append('file', input.profile, `profile.${profileExt}`)
        const response = await axios({
            method: "post",
            url: `${baseUrl}/file`,
            data: formProfileData,
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
        });
        profilePath = response.data.path;
    } else if (typeof input.profile === "string") {
        profilePath = input.profile;
    }

    if (typeof input.deskImg === "object") {
        const deskImgExt = input.deskImg.name.split('.').pop();
        const formDeskData = new FormData();
        formDeskData.append('file', input.deskImg, `desk.${deskImgExt}`)
        const response = await axios({
            method: "post",
            url: `${baseUrl}/file`,
            data: formDeskData,
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
        });
        deskImgPath = response.data.path;
    } else if (typeof input.deskImg === "string") {
        deskImgPath = input.deskImg;
    }

    const dataWithUrl = { ...input, deskImg: deskImgPath, profile: profilePath }
    const formedToken = { headers: { "Authorization": `Bearer ${token}` } };
    const { data } = await axios.put(`${baseUrl}/desks/${deskId}`, dataWithUrl, formedToken);
    return data;
}
// export const putModifyDesk = async ({ post, deskId }) => { // 사진전송추가 수정기능
//     const token = localStorage.getItem("token");
//     console.log('🐹수정요청' + deskId);

//     console.log(post);
//     const { path: profilePath } = await axios({
//         method: "post",
//         url: `${baseUrl}/file`,
//         data: post.profile,
//         headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
//     });
//     const { path: deskImgPath } = await axios({
//         method: "post",
//         url: `${baseUrl}/file`,
//         data: post.deskImg,
//         headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}` }
//     });
//     const dataWithUrl = { ...post, deskImg: deskImgPath, profile: profilePath }
//     const formedToken = { headers: { "Authorization": `Bearer ${token}` } };
//     const { data } = await axios.put(`${baseUrl}/desks/${deskId}`, dataWithUrl, formedToken);
//     return data;
// }

export const deleteDesk = async (deskId) => { // 책상삭제 fix
    const token = localStorage.getItem("token");
    console.log('🐱' + deskId);

    const sentToken = { headers: { "Authorization": `Bearer ${token}` } };
    const response = await axios.delete(`${baseUrl}/desks/${deskId}`, sentToken);
    console.log(JSON.stringify(response));
    const message = await response.data.msg;
    return message;
}



export const postSignUp = async (user) => { // 회원가입
    const { data } = await axios.post(`${baseUrl}/auth/signup`, user);
    return data;
}

export const postLogIn = async (user) => { // 로그인
    const { data } = await axios.post(`${baseUrl}/auth/login`, user);
    console.log(data);
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

