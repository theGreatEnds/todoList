import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ${reset};
    @font-face {
        font-family: "Noto Sans KR", sans-serif;
        font-style: light;
        font-weight: light;
        src: url("./NotoSansKR-Light.otf") format("truetype");
      }
      
      html {
        font-family: "Noto Sans KR", sans-serif;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 15px;
      }
      * {
        font-family: "Noto Sans KR", sans-serif;
        margin: 0;
        padding: 0;
        
      }
    
      body {
        box-sizing: border-box;
        font-family: "Noto Sans KR"; 
      }
`;

export default GlobalStyle;