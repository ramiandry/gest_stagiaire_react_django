import { useState } from "react";
import axios from "axios";

export default function useDeleteUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        "http://localhost:8000/api/v1/users/"+id+"/",
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    data,
    error,
    loading,
  };
}
