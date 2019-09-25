import { css } from 'styled-components';

const variables = {
  __app_max_width: '1024px',

  /* Colors */
  __white: '#ffffff',
  __black: '#000000',
  __grey_100: '#fafafa',
  __grey_200: '#eeeeee',
  __grey_300: '#bdbdbd',
  __grey_400: '#424242',
  __grey_500: '#121212',
  __color_primary: '#2196f3',

  /* Category colors */
  __category_1: '#f44336',
  __category_2: '#03a9f4',
  __category_3: '#4caf50',
  __category_4: '#673ab7',
  __category_5: '#e91e63',
  __category_6: '#ffc107',
  __category_7: '#3f51b5',

  /* Font-sizes */
  __fs_xsmall: '1rem',
  __fs_small: '1.2rem',
  __fs_medium: '1.4rem',
  __fs_default: '1.6rem',
  __fs_large: '2.4rem',
  __fs_xlarge: '3.6rem',
};

/* Turn variables into valid css custom properties */
const customProperties = Object.keys(variables).map(
  (key) => `${[key.replace(/_/g, '-')]}: ${variables[key]};`
);

export { variables };
export default customProperties;
