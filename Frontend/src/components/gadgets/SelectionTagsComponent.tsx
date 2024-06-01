import React from 'react';

const SelectionTagsComponent = ({ data }) => {
  return (
    <div>
      {data.map((item, idx) => (
        <div key={idx} style={{ width: '100px', background: 'white', margin: '5px', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          {/*item*/}
        </div>
      ))}
    </div>
  );
};

export default SelectionTagsComponent;