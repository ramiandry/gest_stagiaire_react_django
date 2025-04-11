import { useState } from "react";
import axios from "axios";

export default function useFetchCand() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchCandidature = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/candidatures",
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchCandidature,
    data,
    error,
    loading,
  };
}
