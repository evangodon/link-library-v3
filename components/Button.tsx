import styled from 'styled-components';


const Button = styled.button`
  text-transform: uppercase;
  border: 1px solid currentColor;
  background-color: transparent;
  padding: 0 2.4rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: var(--fs-xsmall);
  --height: 4.2rem;
  line-height: var(--height);
  height: var(--height);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  border-radius: 5px;
  max-width: 10rem;

  &:hover {
    opacity: 0.6;
  }
`;

export default Button;