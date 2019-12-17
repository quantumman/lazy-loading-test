// @flow

import * as React from "react";

type Props<T: { id: string }> = {
  items: AsyncGenerator<T, void, void>,
  children: React.StatelessFunctionalComponent<T>,
}

type Selector<T, U> = (source: T, index?: number) => U;

function useAsyncGenerator<T: { id: string }>(it: AsyncGenerator<T, void, void>): T[] {
  const isMounted = React.useRef(true);
  const [ items, setItems  ] = React.useState<T[]>([]);

  React.useEffect(() => {
    const timeout = setTimeout(async function () {
      for await (const item of it) {
        if (isMounted.current) {
          setItems(is => [...is, item]);
        }
      }
    }, 0);
    return () => {
      isMounted.current = false;
      it.return();
      clearTimeout(timeout);
    }
  }, []);


  return items;
}

const LazyList = <T: {id: string}>({ items, children }: Props<T>) => {
  const xs = useAsyncGenerator(items);
  return <>
    {xs.map(x => <div key={x.id}>{children(x)}</div>)}
    </>
};

export default React.memo<Props<any>>(LazyList);