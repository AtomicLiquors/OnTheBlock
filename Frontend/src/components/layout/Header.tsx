import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "@/assets/logos/logo.png";
import UserDropPanel from "@/components/layout/UserDropPanel";
import { ProfileImg } from "@/components"
import { useEffect } from "react";
import { getLoginInfo } from "@/hooks";
import { LoginInfo } from "@/types/loginInfo";

function Header() {
  const [userInfoVisibility, setUserInfoVisibility] = useState(false);

  const toggleUserInfoMenu = () => {
    if (userInfoVisibility) { // 패널이 닫혔다면,
      setHasNewNotice(false); // 모든 알림은 확인된 것으로 간주합니다.
      setHasUnread(false);
    }
    
    setUserInfoVisibility(!userInfoVisibility);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [nickname, setNickname] = useState<string>("");
  const [hasNewNotice, setHasNewNotice] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const shouldHeaderHide = (path: string) => {
    return path === "/" || path === "/memberInit" || path.match(/\/bridge.*/)
  }

  useEffect(() => {
    setUserInfoVisibility(false);
    if(shouldHeaderHide(location.pathname))
      return;
    
    const loggedInNickname = getLoginInfo(LoginInfo.Nickname);
    setNickname(loggedInNickname ? loggedInNickname : "");
    
  }, [location.pathname]);
  
  if(shouldHeaderHide(location.pathname))
    return null;
  


  return (
    <S.Wrap>
      <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>
      <S.LoginInfoTab onClick={() => toggleUserInfoMenu()}>
        <div className="login-info">
          <b>{nickname}</b>님
        </div>
        <S.ProfileIconWrap>
          <ProfileImg nickname={nickname} size={32}/>
          { (hasNewNotice || hasUnread) && <S.RedMark></S.RedMark> }
        </S.ProfileIconWrap>
      </S.LoginInfoTab>
      {!(shouldHeaderHide(location.pathname)) && (
        <UserDropPanel
          userInfoVisibility={userInfoVisibility}
          onNewNotice={() => setHasNewNotice(true)}
          onReadAll={() => setHasUnread(false)}
          hasUnread={hasUnread}
          setHasUnread={setHasUnread}
        />
      )}
    </S.Wrap>
  );
}

const S = {

  LoginInfoTab: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;

    & > .login-info {
      color: #d7d7d7;
    }

    > * {
      margin-left: 10px;
    }
  `,

  ProfileIconWrap: styled.div`
    position: relative;
  `,

  RedMark: styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    height: 10px;
    width: 10px;
    background: red;
    border-radius: 50%;
  `,

  Wrap: styled.div`
    background: #131313;
    position: sticky;
    z-index: 100;
    top: 0;
    left: 0;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Logo: styled.img`
    width: 160px;
    cursor: pointer;
  `,
};

export default Header;
