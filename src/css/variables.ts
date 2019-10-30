import { css } from 'styled-components';

const variables: { [index: string]: string } = {
  __app_max_width: '1024px',

  /* Colors */
  __white: '#ffffff',
  __black: '#000000',
  __grey_100: '#F7FAFC',
  __grey_200: '#EDF2F7',
  __grey_300: '#A0AEC0',
  __grey_400: '#718096',
  __grey_500: '#4A5568',
  __grey_600: '#1A202C',
  __color_primary: '#2196f3',
  __danger_red: '#F56565',

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

  __border_radius: '4px',
};

/* Turn variables into valid css custom properties */
const customProperties = Object.keys(variables).map(
  (key) => `${[key.replace(/_/g, '-')]}: ${variables[key]};`
);

const sizes = {
  desktop: 1080,
  tablet: 950,
  mobile: 740,
};

// Iterate through the sizes and create a media template
export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (first: any, ...interpolations: any[]) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(first, ...interpolations)}
      }
    `;

    return acc;
  },
  {} as { [key in keyof typeof sizes]: any }
);

export { variables };
export default customProperties;
