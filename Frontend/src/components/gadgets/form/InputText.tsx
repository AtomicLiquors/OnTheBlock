import React, {forwardRef} from "react";
import styled from "styled-components"

export interface InputProps {
  placeholder: string;
  defaultValue?: string;
}

export interface InputTextProps extends InputProps{
  handleChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputTextAreaProps extends InputProps{
  handleChange?: (e:React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(({placeholder, defaultValue="", handleChange}, ref) => {
  return <S.Input ref={ref} value={defaultValue} placeholder={placeholder} onChange={handleChange}/>;
});

const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(({placeholder, defaultValue="", handleChange}, ref) => {
  return <S.Textarea ref={ref} value={defaultValue} placeholder={placeholder} onChange={handleChange}/>;
});

const S = {
  Textarea: styled.textarea`
    border: solid 1.5px #212121;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #303030;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    width: 480px;
    height: 120px;
    align: top !important;
    justify-content: start;
    align-item: start;
    padding: 5px;
    color: #f2f2f2;
    overflow: scroll;
    resize: none;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: rgba(0 0 0 0);
    }

    &::-webkit-scrollbar-corner {
      display: none;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 30px;
      background-color: gray;
    }

    &:hover {
      border: solid 1.5px #d2691e;
      -webkit-transition: 0.5s;
      transition: 0.5s;
    }

    &::placeholder {
      font-size: 0.9em;
      color: #f2f2f2;
    }
  `,

  Input: styled.input`
    border: solid 1.5px #212121;
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #303030;
    padding: var(--field-padding);
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    padding: 5px;
    width: 250px;
    color: #f2f2f2;

    &:hover {
      border: solid 1.5px #d2691e;
      -webkit-transition: 0.5s;
      transition: 0.5s;
    }

    &::placeholder {
      font-size: 0.9em;
      color: #f2f2f2;
    }
  `,
};

export { InputText, InputTextArea};