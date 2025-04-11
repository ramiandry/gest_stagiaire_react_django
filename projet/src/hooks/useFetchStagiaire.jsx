import { useState } from "react";
import axios from "axios";

export default function useFetchStagiaire() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchStagiaire = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users",
      );
      setData(response.data.filter((user) => user.role === "stagiaire"));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchStagiaire,
    data,
    error,
    loading,
  };
}
