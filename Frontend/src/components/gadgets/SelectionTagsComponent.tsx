import React from 'react';

export type MultiSelectType = {
  id: Number;
  name: string;
}

export interface SelectionTagsComponentProps {
  data: MultiSelectType[];
}

const SelectionTagsComponent: React.FC<SelectionTagsComponentProps> = ({ data }) => {
  return (
    <div>
      {data.map((item: MultiSelectType, idx: number) => (
        <div key={idx} style={{ width: '100px', background: 'white', margin: '5px', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SelectionTagsComponent;