import { useState } from "react";
import axios from "axios";

export default function useCreateCandidature() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createCandidature = async (candidatureData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/candidatures/",
          candidatureData
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCandidature,
    data,
    error,
    loading,
  };
}
