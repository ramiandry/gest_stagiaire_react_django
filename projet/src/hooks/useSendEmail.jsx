import { useState } from "react";
import axios from "axios";

export default function useSendEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendEmail = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/candidatures/sendmail",
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
    sendEmail,
    data,
    error,
    loading,
  };
}
