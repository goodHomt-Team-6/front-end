import React, { forwardRef } from 'react';
import styled from 'styled-components';
import Color from './Color';

//Grid
const Grid = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.flex_direction === 'column' ? 'column' : 'row'};
  ${(props) => (props.border ? `border: ${props.border};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  width: ${(props) => (props.width ? props.width : '100%')};
  min-width: 40px;
  height: ${(props) => (props.height ? props.height : '100%')};
  align-items: ${(props) => (props.align ? props.align : 'center')};
  justify-content: ${(props) =>
    props.justify_contents ? props.justify_contents : 'flex-start'};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.is_root ? `width: 100vw; height: 100vh;` : '')}
  ${(props) =>
    props.hover ? `&:hover{cursor: pointer; background-color: #44444455;}` : ''}
    ${(props) => (props.color ? `color:${props.color};` : '')}
  ${(props) => (props.textAlign ? `text-align: center;` : '')}
`;

const Text = (props) => {
  if (props.type === 'title') {
    return <H1 {...props}>{props.children}</H1>;
  }

  if (props.type === 'contents') {
    return <P {...props}>{props.children}</P>;
  }

  if (props.type === 'label') {
    return <Span {...props}>{props.children}</Span>;
  }

  return <React.Fragment>{props.children}</React.Fragment>;
};

const H1 = styled.h1`
  margin: 0px;
  ${(props) =>
    props.fontSize ? `font-size:${props.fontSize};` : 'font-size:1.5em;'}
  ${(props) =>
    props.textAlign ? `text-align: ${props.textAlign};` : 'text-align: center;'}
  ${(props) => (props.bold ? `font-weight: bold;` : '')}
  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  ${(props) => (props.padding ? `padding:${props.padding};` : '')}
  ${(props) => (props.fontWeight ? `font-weight:${props.fontWeight};` : '')}
`;

const P = styled.p`
  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  ${(props) => (props.color ? `color:${props.color};` : '')}
  ${(props) => (props.minWidth ? `min-width:${props.minWidth};` : '')}
  ${(props) => (props.minHeight ? `min-height:${props.minHeight};` : '')}
  ${(props) => (props.width ? `width:${props.width};` : '')}
  ${(props) => (props.bgColor ? `background-color:${props.bgColor};` : '')}
  ${(props) => (props.padding ? `padding:${props.padding};` : '')}
  ${(props) =>
    props.fontSize ? `font-size:${props.fontSize};` : 'font-size:1em;'}
  ${(props) => (props.textAlign ? `text-align:${props.textAlign};` : '')}
  ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight};` : '')}
  ${(props) => (props.opacity ? `opacity:${props.opacity};` : '')}
  ${(props) => (props.lineHeight ? `line-height:${props.lineHeight};` : '')}
  ${(props) => (props.visible ? `width:0px` : '')}
`;

const Span = styled.span`
  ${(props) => (props.margin ? `margin:${props.margin};` : `margin: 0px;`)}
  ${(props) =>
    props.fontSize ? `font-size:${props.fontSize};` : `font-size: 0.4em;`}
  ${(props) => (props.color ? `color:${props.color};` : `color: #888;`)}
  font-family: 'PoppinsR';
  ${(props) => (props.opacity ? `opacity:${props.opacity};` : '')}
  ${(props) => (props.fontWeight ? `font-weight: ${props.fontWeight};` : '')}
`;

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
    id,
    maxWidth,
    borderRadius,
    fontSize,
    alignSelf,
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
    maxWidth: maxWidth,
    borderRadius: borderRadius,
    fontSize: fontSize,
    alignSelf: alignSelf,
  };

  return (
    <BasicBtn id={id} {...styles} onClick={_onClick}>
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
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '5px'};
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 700;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '15px')};
  line-height: 1em;
  max-width: ${(props) => props.maxWidth};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : '')};
`;
// Icon
const Icon = forwardRef((props, ref) => {
  const { width, margin, src, onClick } = props;
  const styles = {
    margin: margin,
    src: src,
    width: width,
  };

  return <IconImg {...styles} onClick={onClick}></IconImg>;
});

const IconImg = styled.img`
  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  ${(props) => (props.width ? `width:${props.width};` : '')}
  :hover {
    cursor: pointer;
  }
`;

// Image
const Image = forwardRef((props, ref) => {
  const { src, width, height, margin, borderRadius, bgColor, _onClick } = props;
  const styles = {
    src: src,
    width: width,
    height: height,
    margin: margin,
    borderRadius: borderRadius,
    bgColor: bgColor,
  };

  return <ImageCircle {...styles} onClick={_onClick} ref={ref}></ImageCircle>;
});

const ImageCircle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '50%'};
  background-image: url('${(props) => props.src}');
  background-size: cover;
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};
`;

//Input
const Input = forwardRef((props, ref) => {
  const {
    bgColor,
    searchbox,
    boxShadow,
    borderRadius,
    width,
    height,
    value,
    _onChange,
    _onClick,
    placeholder,
    type,
    border,
    borderBottom,
    margin,
    padding,
    attention,
  } = props;

  const styles = {
    bgColor: bgColor,
    boxShadow: boxShadow,
    borderRadius: borderRadius,
    width: width,
    height: height,
    onChange: _onChange,
    onClick: _onClick,
    placeholder,
    type,
    value,
    border,
    margin,
    borderBottom,
    padding,
  };

  if (searchbox) {
    if (attention) {
      return <SearchInput {...styles} className="vibrate-1" ref={ref} />;
    } else {
      return <SearchInput {...styles} />;
    }
  } else {
    return <ElInput {...styles} />;
  }
});

const SearchInput = styled.input`
  font-size: 15px;
  box-sizing: border-box;
  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : '50px')};
  padding: 14px 18px;
  margin: ${(props) => props.margin};
  &:focus,
  &:active {
    outline: none;
  }
  border-radius: ${({ borderRadius }) => borderRadius};
  border: ${({ border }) => border};
`;

const ElInput = styled.input`
  font-size: 18px;
  font-weight: 500;
  width: 90%;
  height: 30px;
  padding: 10px;
  margin-bottom: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1.5px solid ${Color.lightGray};
  :active {
    outline: none;
  }
`;

const FooterButton = styled.div`
  background-color: ${(props) => (props.disabled ? `#9E9EA0;` : '#000')};
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-weight: bold;
  cursor: pointer;
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

export { Grid, Text, Button, Image, Input, FooterButton, Icon };
