import { useState } from "react";
import axios from "axios";

export default function useDeleteEvaluation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteEvaluation = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/evaluations/"+id+"/",
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteEvaluation,
    data,
    error,
    loading,
  };
}
