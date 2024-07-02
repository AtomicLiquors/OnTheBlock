import { checkDuplicateNickname } from "@/api/member";
import { useState } from "react";

const nicknameHook = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameCheckMsg, setNicknameCheckMsg] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  const checkNickname = () => {
    
    checkDuplicateNickname(nickname).then((response) => {
      //console.log(response.data);
      if (response.data == true) {
        setNicknameCheckMsg("사용 가능한 닉네임입니다!");
        setIsNicknameAvailable(true);
      } else {
        setNicknameCheckMsg("이미 존재하는 닉네임입니다.");
        setIsNicknameAvailable(false);
      }
    });
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNickname = e.target.value;
    if (currentNickname.length < 2 || currentNickname.length > 10) {
      setNicknameCheckMsg("닉네임은 최소 2글자 이상, 10글자 이하여야 합니다.");
      return;
    }
    setNickname(currentNickname);
    // To-Do : 글자 수, 중복검사 활성화 여부 여기서 발동.
  };

  return { nickname, nicknameCheckMsg, checkNickname, handleNicknameChange, isNicknameAvailable };
};

export default nicknameHook;