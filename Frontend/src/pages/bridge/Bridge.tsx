import { saveLoginInfo } from '@/hooks';
import { LoginInfo } from '@/types/loginInfo';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Bridge() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅을 사용하여 현재 경로 정보를 가져옴
  const queryParams = new URLSearchParams(location.search); // 쿼리 문자열을 파싱하기 위해 사용

  const parseCookie = (cookieString: string) => {
    //To-Do : cookie 형식이 맞는지 검증하고 아니면 에러처리?
    
    const cookies = cookieString.split(';').map((cookie) => {
      const [name, value] = cookie.trim().split('=');
      return { [name]: value.trim() };
    });

    //To-Do : cookie에서 유효한 값을 찾지 못한 경우 에러처리.
    const accessToken = cookies.find((cookie) => 'accessToken' in cookie)?.accessToken;
    const refreshToken = cookies.find((cookie) => 'refreshToken' in cookie)?.refreshToken;
    const memberId = cookies.find((cookie) => 'memberId' in cookie)?.memberId;

    return [accessToken, refreshToken, memberId];
  }

  useEffect(() => {
      // 쿠키를 불러옴
      const cookieString = document.cookie;

      // 쿠키에서 데이터를 분리한 후 데이터 저장
      const [accessToken, refreshToken, memberId] = parseCookie(cookieString);
      
      if(accessToken && refreshToken && memberId){
        // 토큰을 로컬에 저장
        saveLoginInfo(LoginInfo.AccessToken, accessToken);
        saveLoginInfo(LoginInfo.RefreshToken, refreshToken);
        saveLoginInfo(LoginInfo.MemberId, memberId);
      }

      // 쿼리 문자열에서 isNewMember 값을 추출
      const isNewMember = queryParams.get('isNewMember');
      const queryName = queryParams.get("nickName");
      
      //To-Do: Parameter 찾지 못할시 예외처리
      if(queryName)
        saveLoginInfo(LoginInfo.Nickname, queryName);// 닉네임 저장

      // 1인 경우 기존 멤버
      if (isNewMember === '1') {
        // main 페이지로 이동
        navigate('/main', { replace: true });
        //navigate('/memberInit', { replace: true });
      }
      // 0인 경우 new 멤버
      else {
        // 멤버 초기 입력 페이지로 이동
        navigate('/memberInit', { replace: true });
      }
  }, []);

  return (
    <div className="Bridge">
      회원 인증 처리중입니다. 잠시만 기다려주세요...
    </div>
  );
}

export default Bridge;