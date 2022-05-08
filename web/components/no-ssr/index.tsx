import { PropsWithChildren, ReactElement, useEffect, useState } from 'react';

export interface NoSsrProps {
  onSSR: ReactElement
}

export const NoSSR = (props: PropsWithChildren<NoSsrProps>) => {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => setCanRender(true), []);

  if (!canRender) {
    return props.onSSR;
  }

  return <>{props.children}</>;
}
