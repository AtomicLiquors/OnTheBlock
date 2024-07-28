import styled from "styled-components";
import { useState, useEffect } from "react";

function MultiSelect({ data, onChange }) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOpacity((prevOpacity) => (prevOpacity === 1 ? 0.5 : 1));
    }, 500);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <>
      <select
        multiple
        value={data}
        onChange={(e) => onChange(e)}
        style={{ display: "flex" }}
      >
        {data.map((item, _) => (
          <option
            onMouseDown={(e) => {
              e.preventDefault();
              element.parentElement.focus();
              this.selected = !this.selected;
              return false;
            }}
            value={item.id}
          >
            {item.instrumentName}
          </option>
        ))}
        {/* option 태그 내용이 item의 종류에 종속적! */}
      </select>
    </>
  );
}

const S = {
  BlinkText: styled.div`
    transition: opacity 0.5s ease-in-out;
  `,

  SubText: styled.div`
    color: #aaa;
    font-size: 0.8em;
  `,
};

export default MultiSelect;
