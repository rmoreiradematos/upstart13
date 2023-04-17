import React, { useState } from "react";

interface FetchResult<T> {
  response: Response | undefined;
  json: T | undefined;
}

interface UseFetch {
  fetchData: <T>(url: string) => Promise<FetchResult<T>>;
  data: unknown;
  error: Error | null;
  loading: boolean;
}

const useFetch = (): UseFetch => {
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchData<T>(url: string): Promise<FetchResult<T>> {
    let response, json;
    try {
      setLoading(true);
      response = await fetch(url);
      json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      return { response, json };
    }
  }
  return { fetchData, data, loading, error };
};

export default useFetch;