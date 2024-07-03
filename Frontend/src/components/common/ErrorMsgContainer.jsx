
import styled from "styled-components";
import Logo from "@/assets/logos/logo_white.png";

function ErrorMsgContainer({ errorMsg, height="auto", width = "auto" }) {
    return (
      <S.ErrorMsgContainer style={{height: height, width: width}}>
        <S.EmptyMsgDynamic>
          {errorMsg && <div>{errorMsg}</div>}
        </S.EmptyMsgDynamic>
      </S.ErrorMsgContainer>
    );
}

const S = {
    ErrorMsgContainer: styled.div`
    display: flex;
    padding: 0.4rem;
    border: 1px solid #444;
    border-radius: 10px;
    background: #fae2a5;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,

  EmptyMsgDynamic: styled.div`
    font-size: 0.8em;
    color: #333;
    opacity: 0.8;
  `,
};

export default ErrorMsgContainer;