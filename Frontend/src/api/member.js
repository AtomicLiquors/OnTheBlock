import { client, clientWithToken } from "./client";

const MemberURL = 'member/';

export const getMyUserInfo = () => {
  return clientWithToken().get(MemberURL + 'me/check');
};

export const getUserInfo = (memberId) => {
    return clientWithToken().get(MemberURL + 'check', { params: { memberId } });
};

export const changeUserNickname = (newNickname) => {
  return clientWithToken().post(MemberURL + 'nickname/check', {}, { params: { nickname: newNickname } });
};

export const changeUserDescription = (newDescription) => {
  return clientWithToken().post(MemberURL + 'description/check', {}, { params: { description: newDescription } });
};

// 닉네임 중복 검사
export const checkDuplicateNickname=(nickname)=>{
  return client().get(MemberURL+'nickname', { params: { nickname } });
}

// 닉네임, 관심 악기, 관심 장르 등록
export const registMemberInit=(nickname, selectedInstruments, selectedGenres)=>{
  const memberInitRequest = {
    memberId: localStorage.getItem("memberId"),
    nickname: nickname,
    instruments: selectedInstruments,
    genres: selectedGenres
  };
  return clientWithToken().post(MemberURL+'registInit/check',memberInitRequest);
}