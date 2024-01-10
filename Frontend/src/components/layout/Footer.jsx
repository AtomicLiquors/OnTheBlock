import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "@/assets/logos/logo_white.png";

function Footer() {
  const navigate = useNavigate();

  return (
    <S.Wrap>
      <S.Logo onClick={() => navigate("/main")} src={Logo}></S.Logo>
    </S.Wrap>
  );
}

const S = {
  Wrap: styled.div`
    background: #131313;
    top: 0;
    left: 0;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;
    height: 256px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Logo: styled.img`
    width: 160px;
    cursor: pointer;
  `,
};

export default Footer;
