import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export default function useFetchOneUser() {
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
      if(response.data.role !="Stagiaire"){
        setData(response.data);
        setAuth(true)
        localStorage.setItem("user_id", response.data.id)
      }else{
      toast.error("Email ou mot de passe incorrect");
      }
      

    } catch (err) {
      setError(err);
      setData(null)
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
