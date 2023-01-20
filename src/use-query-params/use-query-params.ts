import * as qs from "qs";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SetQueryParams } from "./types";

const useQueryParams = <T extends object>(): [T, SetQueryParams<T>] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(
    () => qs.parse(searchParams.toString()) as T,
    [searchParams]
  );

  const setQueryParams: SetQueryParams<T> = useCallback(
    (newQueryParams) => {
      const newSearchParams = qs.stringify(newQueryParams, { encode: false });

      setSearchParams(newSearchParams);
    },
    [setSearchParams]
  );

  return [queryParams, setQueryParams];
};

export default useQueryParams;
