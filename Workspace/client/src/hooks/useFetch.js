import { useState } from "react";

export default function useFetch(apiFunc) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const execute = async (...args) => {
    try {
      setLoading(true);
      const res = await apiFunc(...args);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, execute };
}