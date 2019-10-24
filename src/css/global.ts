import { createGlobalStyle } from 'styled-components';
import customProperties, { media } from './variables';

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

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    position: absolute;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--grey-500);
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  .desktop-only {
    opacity: 1;
    pointer-events: auto;

    ${media.tablet`
      opacity: 0;
      pointer-events: none;
    `}
  }

  .mobile-only {
    opacity: 0;
    pointer-events: none;

    ${media.tablet`
      opacity: 1;
      pointer-events: auto;
    `} 
  }
`;

export default GlobalStyle;
