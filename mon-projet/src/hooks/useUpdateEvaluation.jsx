import { useState } from "react";
import axios from "axios";

export default function useUpdateEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateEvaluation = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/evaluations/"+formData.id+"/",
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
    updateEvaluation,
    data,
    error,
    loading,
  };
}
