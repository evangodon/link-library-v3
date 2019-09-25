import Link from './Link';

declare global {
  interface Window {
    __SSR_LINKS__: Link[] | [];
  }
}
