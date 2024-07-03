import { MultiSelectItemType } from "@/types";
import { client, clientWithToken } from "./client";
import { getLoginInfo } from "@/hooks";
import { LoginInfo } from "@/types/loginInfo";

const MemberURL = 'member/';

export const getMyUserInfo = () => {
  return clientWithToken().get(MemberURL + 'me/check');
};

export const getUserInfo = (memberId: string) => {
    return clientWithToken().get(MemberURL + 'check', { params: { memberId } });
};

export const changeUserNickname = (newNickname: string) => {
  return clientWithToken().post(MemberURL + 'nickname/check', {}, { params: { nickname: newNickname } });
};

export const changeUserDescription = (newDescription: string) => {
  return clientWithToken().post(MemberURL + 'description/check', {}, { params: { description: newDescription } });
};

// 닉네임 중복 검사
export const checkDuplicateNickname=(nickname: string)=>{
  return client().get(MemberURL+'nickname', { params: { nickname } });
}

// 닉네임, 관심 악기, 관심 장르 등록
export const registMemberInit=(nickname: string, selectedInstruments: MultiSelectItemType[], selectedGenres: MultiSelectItemType[])=>{
  const memberInitRequest = {
    memberId: getLoginInfo(LoginInfo.MemberId),
    nickname: nickname,
    instruments: selectedInstruments,
    genres: selectedGenres
  };
  return clientWithToken().post(MemberURL+'registInit/check',memberInitRequest);
}