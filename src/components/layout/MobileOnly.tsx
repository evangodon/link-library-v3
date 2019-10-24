import styled from 'styled-components';
import { media } from 'css/variables';

const MobileOnly = styled.div`
  display: inline;

  ${media.mobile`
    display: none;
  `}
`;

export default MobileOnly;
