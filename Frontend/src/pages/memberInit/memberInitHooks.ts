import { getAllGenres } from "@/api/genre";
import { getAllInstruments } from "@/api/instrument";
import { MSEnum, MultiSelectItemType } from "@/types";
import { SelectButtonChangeEvent } from "primereact/selectbutton";
import { useEffect, useState } from "react";
import { checkDuplicateNickname } from "@/api/member";

const [instruments, setInstruments] = useState<MultiSelectItemType[]>([]);
const [genres, setGenres] = useState<MultiSelectItemType[]>([]);

const convertMultiSelectableData = (
  type: MSEnum,
  data: MultiSelectItemType[]
): MultiSelectItemType[] => {
  const convertedData = data.map((item) => ({
    ...item,
    type: type,
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

const [nickname, setNickname] = useState("");
const [nicknameCheck, setNicknameCheck] = useState("");
const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

const [selectedInstruments, setSelectedInstruments] = useState<
  MultiSelectItemType[]
>([]);
const [instrumentSearchResult, setInstrumentSearchResult] = useState(null);

const [selectedGenres, setSelectedGenres] = useState<MultiSelectItemType[]>([]);
const [genreSearchResult, setGenreSearchResult] = useState(null);

const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNickname(e.target.value);
  // To-Do : 글자 수, 중복검사 활성화 여부 여기서 발동.
};

// 버튼 관련
const [isLoading, setIsLoading] = useState(false);

// 프라임리액트
const handleInstrumentSelect = (e: SelectButtonChangeEvent) => {
  console.log(e.value);
  setSelectedInstruments(e.value);
};

// 프라임리액트
const handleGenreSelect = (e: SelectButtonChangeEvent) => {
  console.log(e.value);
  setSelectedGenres(e.value);
};

const handleInstrumentRemove = (
  removingItem: MultiSelectItemType,
  data: MultiSelectItemType[]
) => {
  setSelectedInstruments([...data.filter((item) => item !== removingItem)]);
};

const handleGenreRemove = (
  removingItem: MultiSelectItemType,
  data: MultiSelectItemType[]
) => {
  setSelectedGenres([...data.filter((item) => item !== removingItem)]);
};

const checkNickname = () => {
  if (nickname.length < 2 || nickname.length > 10) {
    alert("닉네임은 최소 2글자 이상, 10글자 이하여야 합니다.");
    return;
  }
  checkDuplicateNickname(nickname).then((response) => {
    //console.log(response.data);
    if (response.data == true) {
      setNicknameCheck("사용 가능한 닉네임입니다!");
      setIsNicknameAvailable(true);
    } else {
      setNicknameCheck("이미 존재하는 닉네임입니다.");
      setIsNicknameAvailable(false);
    }
  });
};

export {
  instruments,
  genres,
  nickname,
  selectedInstruments,
  selectedGenres,
  isLoading,
  setIsLoading,
  checkNickname,
  nicknameCheck,
  handleNicknameChange,
  isNicknameAvailable,
  handleGenreRemove,
  handleGenreSelect,
  handleInstrumentRemove,
  handleInstrumentSelect,
};
