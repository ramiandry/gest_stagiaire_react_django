import { useState } from "react";
import axios from "axios";
import useCreateCandidature from "./useCreateCandidature";

export default function useApplyStageUserExist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const {createCandidature} = useCreateCandidature();

  const applyStageUserExist = async (
    userData, id
  ) => {
    console.log(userData);
    setLoading(true);
    setError(null);
    axios
      .put("http://localhost:8000/api/v1/users/"+id+"/", userData)
      .then((response) => {
         setData(response.data);
          userData.append('candidat', id);
          createCandidature(userData);
        })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    applyStageUserExist,
    data,
    error,
    loading,
  };
}
