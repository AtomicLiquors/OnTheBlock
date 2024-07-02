// To-Do : 겹치는 속성명 등 Enum으로 관리하기.

import { LoginInfo } from "@/types/userInfo";

// 예외처리 : 타입에 해당하지 않는 녀석을 저장하려 할 경우.
export const saveLoginInfo = (type: LoginInfo, value: string) => {
      sessionStorage.setItem(type, value);
}

export const getLoginInfo = (type: LoginInfo) => {
      // 예외처리 하기.
      const info = sessionStorage.getItem(type);
      // if(!accessToken) throw new Error();
      return info;
}


export const removeLoginInfo = (type: LoginInfo) => {
      // 예외처리 하기.
      const info = sessionStorage.removeItem(type);
      // if(!accessToken) throw new Error();
      return info;
}