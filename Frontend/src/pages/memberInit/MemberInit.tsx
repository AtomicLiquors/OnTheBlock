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
import { MultiSelectItemType, MSEnum } from '@/types/';


function MemberInit() {
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);

   const [nickname, setNickname] = useState('');
   const [nicknameCheck, setNicknameCheck]=useState('');
   const [isNicknameAvailable, setIsNicknameAvailable] = useState(false); 



   const [instruments, setInstruments] = useState<MultiSelectItemType[]>([]);
   const [selectedInstruments, setSelectedInstruments] = useState<MultiSelectItemType[]>([]);
   const [ instrumentSearchResult, setInstrumentSearchResult ] = useState(null);

   const [genres, setGenres] = useState<MultiSelectItemType[]>([]);
   const [selectedGenres, setSelectedGenres] = useState<MultiSelectItemType[]>([]);
   const [ genreSearchResult, setGenreSearchResult ] = useState(null);

   const convertMultiSelectableData = (type: MSEnum, data: MultiSelectItemType[]): MultiSelectItemType[] => {
      const convertedData = data.map(item => ({
        ...item, type: type
      }));
      return convertedData;
   };

   useEffect(() => {
       getAllInstruments().then((response) => {
           const data = convertMultiSelectableData(MSEnum.Instrument, response.data);
           setInstruments(data);
       });

       getAllGenres().then((response) => {
           const data = convertMultiSelectableData(MSEnum.Genre, response.data);
           setGenres(data);
       });
   }, []);

   // 버튼 관련
   const [isLoading, setIsLoading] = useState(false);

   /*
   const handleNickNameChange = (e) => {

   }
   */

   const handleInstrumentChange = (e: SelectButtonChangeEvent) => {
      console.log(e.value);
      setSelectedInstruments(e.value);
   }

   const handleGenreChange = (e: SelectButtonChangeEvent) => {
    console.log(e.value);
      setSelectedGenres(e.value)
   }

   const load = () => {
        registMemberInit(nickname,selectedInstruments,selectedGenres).then((response)=>{
            //console.log(response.data);
        })
       setIsLoading(true);
       setTimeout(() => {
            setIsLoading(false);
            navigate('/main', { replace:true });
        },500);
    };

    const checkNickName=()=>{
        if (nickname.length < 2 || nickname.length > 10) {
            alert("닉네임은 최소 2글자 이상, 10글자 이하여야 합니다.");
            return;
        }
        checkDuplicateNickname(nickname).then((response)=>{
            //console.log(response.data);
            if(response.data==true){
                setNicknameCheck("사용 가능한 닉네임입니다!");
                setIsNicknameAvailable(true);
            }
            else{
                setNicknameCheck("이미 존재하는 닉네임입니다.");
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;
          <S.Button
            onClick={checkNickName}
          >중복 검사</S.Button>
        </div>
        {nicknameCheck}

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
          disabled={!isNicknameAvailable && !isLoading}
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
