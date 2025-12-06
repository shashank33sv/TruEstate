import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";

export function useSalesQuery(initialQuery) {
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState({
    data: [],
    total: 0,
    page: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetchSales(query);
        if (!cancelled) {
          setResult(res);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(query)]); // simple deep dependency

  return {
    query,
    setQuery,
    result,
    loading,
    error,
  };
}
