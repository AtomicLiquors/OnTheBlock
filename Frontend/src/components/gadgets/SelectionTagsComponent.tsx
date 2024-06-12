import React from 'react';

export enum MSEnum{
  Instrument,
  Genre
}

export type MultiSelectItemType = {
  type: MSEnum;
  id: number;
  instrumentName: string;
  genreName: string;
};

function getNameFromItem(item: MultiSelectItemType) {
  let name: string = "";
  
  if(item.type === MSEnum.Instrument){
    name = item.instrumentName ? item.instrumentName : "잘못된 속성명";
  }else if(item.type === MSEnum.Genre){
    name = item.genreName ? item.genreName : "잘못된 속성명";
  }
  
  return name;
}

export interface SelectionTagsComponentProps {
  data: MultiSelectItemType[];
}

const SelectionTagsComponent: React.FC<SelectionTagsComponentProps> = ({ data }) => {
  return (
    data && data.length ? 
    <div>
      {data.map((item: MultiSelectItemType, idx: number) => (
        <div key={idx} style={{ width: '100px', background: 'white', margin: '5px', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {getNameFromItem(item)}
        </div>
      ))}
    </div>
    : 
    <></>
  );
};

export default SelectionTagsComponent;