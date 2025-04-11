import { useState } from "react";
import axios from "axios";

export default function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updateUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        "http://localhost:8000/api/v1/users/"+formData.id+"/",
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
    updateUser,
    data,
    error,
    loading,
  };
}
