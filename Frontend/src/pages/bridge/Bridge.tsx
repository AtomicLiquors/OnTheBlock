import { saveAccessToken, saveLoginInfo } from '@/hooks';
import { LoginInfo } from '@/types/loginInfo';
import { deleteCookie, parseCookie } from '@/utils';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Bridge() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅을 사용하여 현재 경로 정보를 가져옴
  const queryParams = new URLSearchParams(location.search); // 쿼리 문자열을 파싱하기 위해 사용


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
      const queryName = queryParams.get("nickname");
      
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