import { useEffect, useRef } from "react";

const useDebounce = (fnCallback, delayTime) => {
  const timeOutRefID = useRef(null);

  useEffect(() => {
    return () => {
      if (timeOutRefID.current) {
        clearTimeout(timeOutRefID.current);
      }
    };
  }, []);

  const debouncedCallback = (...args) => {
    if (timeOutRefID.current) {
      clearTimeout(timeOutRefID.current);
    }
    timeOutRefID.current = setTimeout(() => {
      fnCallback(...args);
    }, delayTime);
  };
  return debouncedCallback;
};

export default useDebounce;
