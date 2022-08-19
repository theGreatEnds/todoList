import {css} from "styled-components";

const flexCenter = css`
  display: flex;
  align-items: center;
`;


const flexLeft = css`
  display: flex;
  justify-content: spacebetween;
  align-items: center;
`;

const divCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const flexMode={
  flexCenter,
  flexLeft,
  divCenter
}

export default flexMode