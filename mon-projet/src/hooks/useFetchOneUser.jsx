import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export default function useFetchOneUser() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchOneUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/findone/",
          formData
      );
      setData(response.data);
      localStorage.setItem("user_id", response.data.id)
      navigate("/dashboard")

    } catch (err) {
      setError(err);
      toast.error("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchOneUser,
    data,
    error,
    loading,
  };
}
