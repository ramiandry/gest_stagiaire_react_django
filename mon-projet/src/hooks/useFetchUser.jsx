import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function useFetchUser() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/",
      );
      setData(response.data);
      navigate("/dashboard")

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUser,
    data,
    error,
    loading,
  };
}
