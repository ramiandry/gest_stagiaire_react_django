import { useState } from "react";
import axios from "axios";

export default function useUpdateCand() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateCandidature = async (form) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/candidatures/"+form.id,
        form
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateCandidature,
    data,
    error,
    loading,
  };
}
