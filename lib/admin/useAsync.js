"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs an async loader and exposes { data, loading, error, reload }.
 * Re-runs when `deps` change. Ignores stale responses.
 */
export default function useAsync(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const ticket = useRef(0);

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/use-memo */
  const run = useCallback(async () => {
    const id = ++ticket.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await loader();
      if (id === ticket.current) {
        setState({ data, loading: false, error: null });
      }
    } catch (error) {
      if (id === ticket.current) {
        setState({ data: null, loading: false, error });
      }
    }
  }, [...deps]);

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      void run();
    };
    queueMicrotask(() => {
      start();
    });
    return () => {
      cancelled = true;
      ticket.current += 1;
    };
  }, [run]);

  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/use-memo */

  return { ...state, reload: run };
}