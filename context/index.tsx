import * as React from 'react';
import { ModalProvider, useModalContext } from './modal-context';
import { LinksProvider, useLinksContext } from './links-context';

export function createCtx<A>() {
  const ctx = React.createContext<A | undefined>(undefined);

  function useCtx() {
    const c = React.useContext(ctx);
    if (!c) throw new Error('useCtx must be inside a Provider with a value');
    return c;
  }
  return [useCtx, ctx.Provider] as const;
}

export { ModalProvider, useModalContext, LinksProvider, useLinksContext };
