import { saveAccessToken, saveLoginInfo, saveRefreshToken } from '@/hooks';
import { LoginInfo } from '@/types/loginInfo';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Bridge() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅을 사용하여 현재 경로 정보를 가져옴
  const queryParams = new URLSearchParams(location.search); // 쿼리 문자열을 파싱하기 위해 사용

  const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  const parseCookie = (cookieString: string) => {
    //To-Do : cookieString 형식이 맞는지 검증하고 아니면 에러처리?
    const cookieMap = new Map();
    cookieString.split(';').map((cookie) => {
      const [name, value] = cookie.trim().split('=');
      cookieMap.set(name, value.trim());
    });

    //To-Do : cookie에서 유효한 값을 찾지 못한 경우 에러처리.
    const accessToken = cookieMap.get('accessToken');
    //const refreshToken = cookieMap.get('refreshToken');
    const memberId = cookieMap.get('memberId');
    
    return [accessToken, memberId];
  }

  useEffect(() => {
      // 쿠키를 불러옴
      const cookieString = document.cookie;

      // 쿠키에서 데이터를 분리한 후 데이터 저장
      const [accessToken, memberId] = parseCookie(cookieString);
      
      if(accessToken && memberId){
        // 토큰을 로컬에 저장
        saveAccessToken(accessToken);
        saveLoginInfo(LoginInfo.MemberId, memberId);
      }

      deleteCookie('accessToken');
      deleteCookie('memberId');

      // 쿼리 문자열에서 isNewMember 값을 추출
      const isNewMember = queryParams.get("isNewMember");
      const queryName = queryParams.get("nickName");
      
      //To-Do: Parameter 찾지 못할시 예외처리
      if(queryName)
        saveLoginInfo(LoginInfo.Nickname, queryName);// 닉네임 저장

      const targetPath = isNewMember === 'false' ? '/main' : '/memberInit';
      navigate(targetPath, { replace: true });  
      
  }, []);

  return (
    <div className="Bridge">
      회원 인증 처리중입니다. 잠시만 기다려주세요...
    </div>
  );
}

export default Bridge;