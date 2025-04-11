import { useState } from "react";
import axios from "axios";

export default function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const createUser = async (userData, is_success=()=>{return null}) => {
    console.log(userData);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users",
          userData
      );
      setData(response.data);
      is_success();
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
