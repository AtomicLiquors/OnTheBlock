// To-Do : 겹치는 속성명 등 Enum으로 관리하기.

import { LoginInfo } from "@/types/loginInfo";

const accessTokenStorage = localStorage;
const loginInfoStorage = sessionStorage;

/* AccessToken */
export const saveAccessToken = (value: string) => {
      accessTokenStorage.setItem("accessToken", value);
}

export const getAccessToken = () => {
      return accessTokenStorage.getItem("accessToken");
}

export const removeAccessToken = () => {
      // 예외처리 하기.
      accessTokenStorage.removeItem("accessToken");
      // if(!accessToken) throw new Error();
}


/* LoginInfo */
// 예외처리 : 타입에 해당하지 않는 녀석을 저장하려 할 경우.
export const saveLoginInfo = (type: LoginInfo, value: string) => {
      loginInfoStorage.setItem(type, value);
}

export const getLoginInfo = (type: LoginInfo) => {
      // 예외처리 하기.
      const info = loginInfoStorage.getItem(type);
      return info;
}

export const removeLoginInfo = (type: LoginInfo) => {
      loginInfoStorage.removeItem(type);
}