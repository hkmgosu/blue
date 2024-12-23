import { useRef, useEffect, useState, useCallback } from 'react';

export enum PromiseStatus {
  quiet = '',
  pending = 'pending',
  fulfilled = 'fulfilled',
  rejected = 'rejected',
}

export function usePromise<Result, Reject>(
  callback: () => Promise<Result>
): [Result | Reject | null, PromiseStatus, () => void] {
  const [status, setStatus] = useState<PromiseStatus>(PromiseStatus.quiet);
  const [result, setResult] = useState<Result | Reject | null>(null);
  const [run, setRun] = useState(false);
  const ref = useRef(callback);
  ref.current = callback;
  useEffect((): (() => void) | void => {
    if (!run || !ref.current) return;

    let cancel: boolean;
    setStatus(PromiseStatus.pending);

    ref
      .current()
      .then((data: Result) => {
        if (cancel) return;
        setResult(data);
        setStatus(PromiseStatus.fulfilled);
        setRun(false);
      })
      .catch((data: Reject) => {
        if (cancel) return;
        setStatus(PromiseStatus.rejected);
        setRun(false);
        setResult(data);
      });
    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  const callbackRun = useCallback(() => {
    setRun(true);
  }, []);

  return [result, status, callbackRun];
}
