import React from "react";
import styled from "styled-components";


//Grid
const Grid = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flex_direction === "column" ? "column" : "row"};
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  width: ${(props) => (props.width ? props.width : "100%")};
  min-width: 50px;
  height: ${(props) => (props.height ? props.height : "100%")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: ${(props) =>
    props.justify_contents ? props.justify_contents : "flex-start"};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.is_root ? `width: 100vw; height: 100vh;` : "")}
  ${(props) =>
    props.hover ? `&:hover{cursor: pointer; background-color: #44444455;}` : ""}
    ${(props) => (props.color ? `color:${props.color};` : "")}
  ${(props) => (props.textAlign ? `text-align: center;` : "")}
`;

const Text = (props) => {
  if (props.type === "title") {
    return <H1>{props.children}</H1>;
  }

  if (props.type === "contents") {
    return <P>{props.children}</P>;
  }

  if (props.type === "label") {
    return <Span>{props.children}</Span>;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

const H1 = styled.h1`
  margin: 0px;
  font-size: 1.5em;
  text-align: center;
  ${(props) => (props.bold ? `font-weight: bold;` : "")}
`;

const P = styled.p`
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  ${(props) => (props.color ? `margin:${props.color};` : "")}
  font-size: 1em;
`;

const Span = styled.span`
  margin: 0px;
  font-size: 0.4em;
  color: #888;
  font-family: "PoppinsR";
`;

// input 스타일!
// const InputC = styled.input`
//   width: ${(props) => (props.width ? props.width : "100%")};
//   border: ${(props) => (props.border ? props.border : "none;")};
//   padding: 2px 4px;
//   ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
// `;

// Button
const Button = (props) => {
  const {
    onKeyPress,
    onSubmit,
    borderColor,
    bgColor,
    color,
    margin,
    padding,
    width,
    height,
    children,
    _onClick,
  } = props;

  const styles = {
    onKeyPress: onKeyPress,
    onSubmit: onSubmit,
    borderColor: borderColor,
    bgColor: bgColor,
    color: color,
    margin: margin,
    padding: padding,
    width: width,
    height: height,
  };

  return (
    <BasicBtn {...styles} onClick={_onClick}>
      {children}
    </BasicBtn>
  );
};

const BasicBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 700;
  font-size: 15px;
  line-height: 1em;
`;


// Image
const Image = (props) => {
  const { src } = props;
  const styles = { src: src };

  return (
    <>
      <ImageCircle {...styles}></ImageCircle>
    </>
  );
};

const ImageCircle = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-image: url("${(props) => props.src}");
    background-size: cover;
    margin-right: 10px;
`;

export { Grid, Text, Button, Image };
