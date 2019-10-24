import styled from 'styled-components';
import { media } from 'css/variables';

const DesktopOnly = styled.div`
  display: inline;

  ${media.tablet`
    display: none;
  `}
`;

export default DesktopOnly;
