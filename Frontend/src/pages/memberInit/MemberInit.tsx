import React, { useState } from "react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
//import { InputText } from "primereact/inputtext";
import { registMemberInit } from "@/api/member";
import InitBanner from "@/assets/banners/init.jpeg";
import { SearchBarComponent } from "@/components";
import SelectionTagsComponent from "@/components/gadgets/SelectionTagsComponent";
import { InputText } from "@/components/gadgets/form/InputText";
import nickNameHook from "@/hooks/memberInit/nicknameHook";
import instrumentHook from "@/hooks/memberInit/instrumentHook";
import genreHook from "@/hooks/memberInit/genreHook";

function MemberInit() {

  const { nickname, nicknameCheckMsg, checkNickname, handleNicknameChange, isNicknameAvailable } = nickNameHook();
  const { instruments, selectedInstruments, handleInstrumentSelect, handleInstrumentRemove } = instrumentHook();
  const { genres, selectedGenres, handleGenreSelect, handleGenreRemove } = genreHook();
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const load = () => {
    registMemberInit(nickname, selectedInstruments, selectedGenres).then(
      (response) => {
        //console.log(response.data);
      }
    );
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/main", { replace: true });
    }, 500);
  };

  const handleSearchInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log(e);
  };

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };

  return (
    <S.Container>
      <S.Title>환영합니다!</S.Title>
      <br />
      {/* style={{ background: `url(${InitBanner})` }} */}
      {/* <Image src="/src/assets/MemberInit_top.jpg" style={{ width: '500px', height: '550px' }} rounded /> */}

      <S.SubTitle>닉네임을 설정해 주세요.</S.SubTitle>
      <div>
        {/*
        <InputText
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        */}
        <InputText
          placeholder={"이름을 입력하세요."}
          defaultValue={nickname}
          handleChange={handleNicknameChange}
        />
        &nbsp;&nbsp;&nbsp;
        <S.Button onClick={checkNickname}>중복 검사</S.Button>
      </div>
      {nicknameCheckMsg}

      <S.SubTitle>어떤 악기를 연주하고 싶으신가요?</S.SubTitle>
      {instruments[0] ? (
        <SelectButton
          value={selectedInstruments}
          onChange={(e) => handleInstrumentSelect(e)}
          optionLabel="instrumentName"
          options={instruments}
          multiple
        />
      ) : (
        <div style={{ width: "1000px", fontSize: "32px" }}>
          악기 정보를 불러오지 못했습니다.\n악기 정보는 회원가입 후
          "마이페이지"에서도 등록할 수 있습니다.
        </div>
      )}
      <div>
        <SearchBarComponent
          ref={inputRef}
          handleInputKeyDown={handleSearchInputKeyDown}
          handleSearchClick={handleSearchClick}
          placeholder="악기 이름을 검색합니다."
        />
      </div>
      <SelectionTagsComponent
        data={selectedInstruments}
        handleRemove={handleInstrumentRemove}
      />

      <S.SubTitle>관심있는 장르는 무엇인가요?</S.SubTitle>
      <SelectButton
        value={selectedGenres}
        onChange={(e) => handleGenreSelect(e)}
        optionLabel="genreName"
        options={genres}
        multiple
      />
      <br />
      <SelectionTagsComponent
        data={selectedGenres}
        handleRemove={handleGenreRemove}
      />
      <br />

      <S.Button
        //label="Submit"
        onClick={load}
        disabled={!isNicknameAvailable && !isLoading}
      >
        Submit
      </S.Button>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    background-size: contain;
    width: 100%;
    height: auto;
    background-color: black;
    color: orange;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
  `,

  Title: styled.h1`
    margin-top: 2rem;
    margin-bottom: 20px;
  `,

  SubTitle: styled.h4`
    margin-top: 1rem;
    margin-bottom: 20px;
  `,

  Button: styled.button`
    padding: 10px;
    background-color: #ffffff;
    border-radius: 5px;

    &:hover {
      background-color: #ddd;
    }
  `,
};

export default MemberInit;
