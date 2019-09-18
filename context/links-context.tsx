import * as React from 'react';
import { createCtx } from './createCtx';
import { Link } from 'interfaces';

export const [useLinksContext, Provider] = createCtx<{
  links: Link[];
  setLinks: (links: Link[]) => void;
}>();

export const LinksProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [links, setLinks] = React.useState<Link[]>([]);

  return (
    <>
      <Provider value={{ links, setLinks }}>{children}</Provider>
    </>
  );
};
