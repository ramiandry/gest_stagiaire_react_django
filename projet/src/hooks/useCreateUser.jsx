import { useState } from "react";
import axios from "axios";

export default function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Convertir en FormData
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/",
        formDataObj
        // PAS DE headers ici ! Axios les gère automatiquement
      );

      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    data,
    error,
    loading,
  };
}
