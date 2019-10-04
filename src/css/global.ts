import { createGlobalStyle } from 'styled-components';
import customProperties from './variables.css';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  :root {
    ${customProperties}
  } 

  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
    background-image: radial-gradient(circle, #D7D7D7, #D7D7D7 1px, #FFF 1px, #FFF);
    background-size: 28px 28px;
    font-weight: 300;
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }


  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
