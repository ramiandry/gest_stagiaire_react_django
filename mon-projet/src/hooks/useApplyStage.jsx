import { useState } from "react";
import axios from "axios";
import useCreateCandidature from "./useCreateCandidature";

export default function useApplyStage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const {createCandidature} = useCreateCandidature();

  const createUser = async (
    userData,
  ) => {
    console.log(userData);
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:8000/api/v1/users/", userData)
      .then((response) => {
        setData(response.data);
        axios.get(
          "http://localhost:8000/api/v1/users/last/",
        ).then((response) => {
          userData.append('candidat', response.data[0].id);
          createCandidature(userData);
        })
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    createUser,
    data,
    error,
    loading,
  };
}
