"use client"

import { useState, useEffect } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./App.css"
  import { ToastContainer, toast} from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import useFetchOneUser from "./hooks/useFetchOneUser"
import axios from "axios"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const {fetchOneUser, data} = useFetchOneUser()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (via localStorage)
    const token = localStorage.getItem("authToken")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (credentials) => {
    // Simulation d'une authentification
    // Dans une application réelle, vous feriez une requête API ici
    if (credentials.email && credentials.password ) {
      // Stocker le token d'authentification
      console.log(credentials)

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/users/findone/",
            credentials
        );
        if(response.data.role !="Stagiaire"){
          localStorage.setItem("authToken", "example-token-12345")
          localStorage.setItem("userId",response.data.id)
          localStorage.setItem("nom_user",response.data.nom)
          setIsAuthenticated(true)
          setLoading(false)
          return { success: true }
        }else{
        toast.error("Email ou mot de passe incorrect");
        }
        
      } catch (err) {
        toast.error("Email ou mot de passe incorrect.");
        setLoading(false)
        return { success: false, message: "Identifiants incorrects" }
      } finally {
        console.log(credentials)
      }
    }else{
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return { success: false, message: "Identifiants incorrects" }

    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Chargement...
      </div>
    )
  }

  return <><ToastContainer />{isAuthenticated ? <Home onLogout={handleLogout} /> : <Login onLogin={handleLogin} isLoading={loading} setIsLoading={setLoading} />}</>
}

export default App

