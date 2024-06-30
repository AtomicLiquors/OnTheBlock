import { MultiSelectItemType, MSEnum } from "@/types/";
import React from "react";
import styled from "styled-components";

function getNameFromItem(item: MultiSelectItemType) {
  let name: string = "";

  if (item.type === MSEnum.Instrument) {
    name = item.instrumentName ? item.instrumentName : "잘못된 속성명";
  } else if (item.type === MSEnum.Genre) {
    name = item.genreName ? item.genreName : "잘못된 속성명";
  }

  return name;
}

export interface SelectionTagsComponentProps {
  data: MultiSelectItemType[];
  handleRemove: (removingItem: MultiSelectItemType, data: MultiSelectItemType[]) => void;
}

const SelectionTagsComponent: React.FC<SelectionTagsComponentProps> = ({
  data, handleRemove
}) => {
  return data && data.length ? (
    <S.TagContainer>
      {data.map((item: MultiSelectItemType, idx: number) => (
        <S.Tag key={idx}>
          {getNameFromItem(item)}
          <S.TagDeleteBtn onClick={() => handleRemove(item, data)}>x</S.TagDeleteBtn>
        </S.Tag>
      ))}
    </S.TagContainer>
  ) : (
    <></>
  );
};

const S = {
  TagContainer: styled.div`
    display:flex;
    gap: 0.5rem;
  `,

  Tag: styled.div`
    display: flex;
    justify-content: end;
    width: 100px;
    background: white;
    color: black;

    
    padding: 0.4rem;
    border-radius: 5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    gap: 10px;
    position: relative;
  `,

  TagLabel: styled.div`
    width: 80%;

  `,

  TagDeleteBtn: styled.div`
    width: 20%;
    text-align: center;
    border-radius: 100%;
    background: grey;
    width: 24px;
    height: 24px;
  `,
};

export default SelectionTagsComponent;
