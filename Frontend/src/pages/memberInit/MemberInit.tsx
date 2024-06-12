import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllInstruments, registMemberInstruments } from '@/api/instrument';
import { getAllGenres, registMemberGenres } from '@/api/genre';
import styled from 'styled-components';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { checkDuplicateNickname } from '@/api/member';
import { registMemberInit } from '@/api/member';
import InitBanner from "@/assets/banners/init.jpeg";
import { SearchBarComponent } from '@/components';
import SelectionTagsComponent from '@/components/gadgets/SelectionTagsComponent';

function MemberInit() {
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);

   const [nickName, setNickName] = useState('');
   const [nickNameCheck, setNickNameCheck]=useState('');
   const [isNicknameAvailable, setIsNicknameAvailable] = useState(false); 

   const [instruments, setInstruments] = useState([]);
   const [selectedInstruments, setSelectedInstruments] = useState([]);
   const [ instrumentSearchResult, setInstrumentSearchResult ] = useState(null);

   const [genres, setGenres] = useState([]);
   const [selectedGenres, setSelectedGenres] = useState([]);
   const [ genreSearchResult, setGenreSearchResult ] = useState(null);

   // 데이터 랜더링
   useEffect(() => {
       getAllInstruments().then((response) => {
           setInstruments(response.data);
       });

       getAllGenres().then((response) => {
           setGenres(response.data);
       });
   }, []);

   // 버튼 관련
   const [loading, setLoading] = useState(false);

   /*
   const handleNickNameChange = (e) => {

   }
   */

   const handleInstrumentChange = (e: SelectButtonChangeEvent) => {
      setSelectedInstruments(e.value);
   }

   const handleGenreChange = (e: SelectButtonChangeEvent) => {
      setSelectedGenres(e.value)
   }

   const load = () => {
        registMemberInit(nickName,selectedInstruments,selectedGenres).then((response)=>{
            //console.log(response.data);
        })
       setLoading(true);
       setTimeout(() => {
            setLoading(false);
            navigate('/main', { replace:true });
        },500);
    };

    const checkNickName=()=>{
        if (nickName.length < 2 || nickName.length > 10) {
            alert("닉네임은 최소 2글자 이상, 10글자 이하여야 합니다.");
            return;
        }
        checkDuplicateNickname(nickName).then((response)=>{
            //console.log(response.data);
            if(response.data==true){
                setNickNameCheck("사용 가능한 닉네임입니다!");
                setIsNicknameAvailable(true);
            }
            else{
                setNickNameCheck("이미 존재하는 닉네임입니다.");
                setIsNicknameAvailable(false);
            }
        })
    }

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(e);
    }

    const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(e);
    }

    return (
      <S.Container>
        <S.Title>환영합니다!</S.Title>
        <br />
        {/* style={{ background: `url(${InitBanner})` }} */}
        {/* <Image src="/src/assets/MemberInit_top.jpg" style={{ width: '500px', height: '550px' }} rounded /> */}

        <S.SubTitle>닉네임을 설정해 주세요!</S.SubTitle>
        <div>
          <InputText
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;
          <S.Button
            onClick={checkNickName}
          >중복 검사</S.Button>
        </div>
        {nickNameCheck}

        <S.SubTitle>어떤 악기를 연주하고 싶으신가요?</S.SubTitle>
        { instruments[0] 
          ? 
          <SelectButton
            value={selectedInstruments}
            onChange={(e) => handleInstrumentChange(e)}
            optionLabel="instrumentName"
            options={instruments}
            multiple
          />
          :
          <div style={{width: "1000px", fontSize: "32px"}}>악기 정보를 불러오지 못했습니다.\n악기 정보는 회원가입 후 "마이페이지"에서도 등록할 수 있습니다.</div>
        }
        <div>
        <SearchBarComponent
              ref={inputRef}
              handleInputKeyDown={handleSearchInputKeyDown}
              handleSearchClick={handleSearchClick}
              placeholder="악기 이름을 검색합니다."
            />
        </div>
        <SelectionTagsComponent data={selectedInstruments}/>

        <S.SubTitle>관심있는 장르는 무엇인가요?</S.SubTitle>
        <SelectButton
          value={selectedGenres}
          onChange={(e) => handleGenreChange(e)}
          optionLabel="genreName"
          options={genres}
          multiple
        />
        <br />
        <br />

        <S.Button
          //label="Submit"
          onClick={load}
          disabled={!isNicknameAvailable}
        >Submit</S.Button>
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

  Button : styled.button` 
    padding :10px; 
    background-color :#ffffff; 
    border-radius :5px; 
    

    &:hover { 
      background-color:#ddd;  
    }   
  `
};

export default MemberInit;
