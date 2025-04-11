import { useState } from "react";
import axios from "axios";

export default function useCreateEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createEvaluation = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/evaluations/",
        formData
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createEvaluation,
    data,
    error,
    loading,
  };
}
