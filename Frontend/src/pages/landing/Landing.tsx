import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { Logo, Banner, socialLoginBtn } from "@/assets";
import Button from "react-bootstrap/Button";

const kakaoLoginUrl =
  import.meta.env.VITE_REACT_APP_BACKEND + "ontheblock/api/kakao/login";
const googleLoginUrl =
  import.meta.env.VITE_REACT_APP_BACKEND + "ontheblock/api/google/login";
const naverLoginUrl =
  import.meta.env.VITE_REACT_APP_BACKEND + "ontheblock/api/naver/login";

const handleLoginButtonClick = (url: string) => {
    window.location.href = url;
}

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <S.Wrap>
      <S.Card>
        <S.Banner>
          <S.Logo src={Logo.Large}></S.Logo>
          <S.Subtitle>
            <span style={{fontSize: '1.2rem'}}>나의 소소한 연주가, 색다른 합주로 태어나는 커뮤니티</span>
            <br />
            다양한 뮤지션들을 만나보세요. 빅데이터로 관심 있는 연주를
            찾아보세요.
          </S.Subtitle>
          <S.LoginContainer>
            <S.LoginImage
              onClick={() => handleLoginButtonClick(kakaoLoginUrl)}
              src={socialLoginBtn.Kakao}
            />

            <S.LoginImage
              onClick={() => handleLoginButtonClick(googleLoginUrl)}
              src={socialLoginBtn.Google}
            />

            <S.LoginImage
              onClick={() => handleLoginButtonClick(naverLoginUrl)}
              src={socialLoginBtn.Naver}
            />
          </S.LoginContainer>
        </S.Banner>
      </S.Card>
    </S.Wrap>
  );
};

const S = {
  LoginContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Subtitle: styled.div`
    text-align: center;
    color: white;
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.8));
  `,

  Wrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: #252525;
  `,

  Card: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  LoginImage: styled.img`
    width: 200px;
    cursor: pointer;
    padding: 0px;
  `,

  NavigateButton: styled(Button)`
    margin-top: 20px;
    width: 100%;
  `,

  Logo: styled.img`
    width: 600px;
  `,

  Banner: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
        to bottom,
        rgba(117, 85, 63, 0.3),
        rgba(156, 96, 100, 0.5)
      ),
      url(${Banner});
    background-size: cover;
    width: 100vw;
    height: 840px;
    gap: 100px;
    padding-top: 50px;
  `,
};

export default Landing;
