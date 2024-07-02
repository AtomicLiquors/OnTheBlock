// To-Do : 겹치는 속성명 등 Enum으로 관리하기.

import { loginUserInfo } from "@/types/userInfo";

// 예외처리 : 타입에 해당하지 않는 녀석을 저장하려 할 경우.
const saveItem = (type: loginUserInfo, value: string) => {
      sessionStorage.setItem(type, value);
}

const getItem = (type: loginUserInfo) => {
      // 예외처리 하기.
      const accessToken = sessionStorage.getItem(type);
      // if(!accessToken) throw new Error();
      return accessToken;
}