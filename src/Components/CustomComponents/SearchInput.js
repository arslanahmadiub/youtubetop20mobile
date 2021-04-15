import React from "react";
import Styled from "styled-components";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

const Asterisk = Styled.span`
    color: red;
    font-size: 16px;
    font-weight: 600;
    display: ${(props) => (props.show === true ? "" : "none")}
`;
const Label = Styled.label`
    font-size: 14px;
    position:relative; 
    padding: 15 0px;
    top: -5px;
`;

const Inputs = Styled.input`
    display: block;
    
    font-size: 16px;
    padding: 0 10px;
    font-weight: 400;
    border: 1px solid #ccc;
    border-radius: 10px;
    &:focus {
        border-radius: 10px;
        border: 2px solid lightblue;
        outline-width: 0px;
    }

`;

let SearchInput = (
  {
    value,
    id,
    placeholder,
    onChange,
    label,
    required,
    type,
    width,
    height,
    onBlur,
    min,
    onKeyDown,
    ...props
  },
  ref
) => {
  return (
    <Inputs
      value={value}
      required={!!required}
      placeholder={placeholder || label || ""}
      type={type || "text"}
      id={id}
      min={min && min}
      name={props.name || id || ""}
      ref={ref && ref}
      onChange={onChange && onChange}
      onKeyDown={onKeyDown && onKeyDown}
      onBlur={onBlur && onBlur}
      style={{
        width: width ? width : "100%",
        height: height ? height : "45px",
      }}
    />
  );
};

export default React.forwardRef(SearchInput);
