import { useState } from "react";
import axios from "axios";

export default function useFetchEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchEvaluation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/evaluations",
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchEvaluation,
    data,
    error,
    loading,
  };
}
