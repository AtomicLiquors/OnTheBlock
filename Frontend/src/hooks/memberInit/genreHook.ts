import { getAllGenres } from "@/api/genre";
import {
  MSEnum,
  MultiSelectItemType,
  convertMultiSelectableData,
} from "@/types";
import { SelectButtonChangeEvent } from "primereact/selectbutton";
import { useEffect, useState } from "react";

const genreHook = () => {
  const [genres, setGenres] = useState<MultiSelectItemType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<MultiSelectItemType[]>(
    []
  );
  const [genreSearchResult, setGenreSearchResult] = useState(null);

  useEffect(() => {
    getAllGenres().then((response) => {
      const data = convertMultiSelectableData(MSEnum.Genre, response.data);
      setGenres(data);
    });
  }, []);

  // 프라임리액트
  const handleGenreSelect = (e: SelectButtonChangeEvent) => {
    console.log(e.value);
    setSelectedGenres(e.value);
  };

  const handleGenreRemove = (
    removingItem: MultiSelectItemType,
    data: MultiSelectItemType[]
  ) => {
    setSelectedGenres([...data.filter((item) => item !== removingItem)]);
  };

  return {genres, selectedGenres, handleGenreSelect, handleGenreRemove};
};

export default genreHook;
