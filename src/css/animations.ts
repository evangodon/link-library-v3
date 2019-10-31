import { keyframes } from 'styled-components';

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.1);
  }
  to {
    opacity: 1;
    transform: scale(1)
  }
`;
