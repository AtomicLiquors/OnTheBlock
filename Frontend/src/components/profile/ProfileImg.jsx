import styled from "styled-components";
import { stringToHslColor } from "@/utils"
import { CgProfile as ProfileIcon } from "react-icons/cg";


function ProfileImg({nickname, size}) {
    return (
      <>
        {nickname ? (
          <S.GeneratedProfileImg
            style={{
              backgroundColor: stringToHslColor(nickname, 80, 50),
              minWidth: `${size}px`,
              minHeight: `${size}px`,
              maxWidth: `${size}px`,
              maxHeight: `${size}px`,
            }}
          >
            <div style={{ fontSize: `${size / 2}px` }}>
              {nickname.charAt(0)}
            </div>
          </S.GeneratedProfileImg>
        ) : (
          <ProfileIcon size={size} color="#d7d7d7" />
        )}
      </>
    );
}

const S = {
  GeneratedProfileImg: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #eee;
    border-radius: 50%;
    color: white;
  `,
};

export default ProfileImg;