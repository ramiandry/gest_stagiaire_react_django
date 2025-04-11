"use client"

import { useState } from "react"

function Login({ onLogin, isLoading, setIsLoading }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simuler un délai de chargement
    setTimeout(() => {
      const result = onLogin(credentials)
      console.log(result)
      if (!result.success) {
        setError(result.message || "Erreur de connexion")
        setIsLoading(false)
      }
    }, 3000)
  }

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "var(--background-light)",
    },
    leftPanel: {
      flex: "1",
      backgroundColor: "var(--primary-color)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      color: "white",
    },
    rightPanel: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
    },
    logo: {
      marginBottom: "30px",
      textAlign: "center",
    },
    logoIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "white",
      color: "var(--primary-color)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "36px",
      margin: "0 auto 20px",
    },
    logoText: {
      fontSize: "28px",
      fontWeight: 700,
      marginBottom: "5px",
    },
    logoSubtitle: {
      fontSize: "18px",
      opacity: 0.9,
    },
    welcomeText: {
      fontSize: "24px",
      fontWeight: 600,
      marginBottom: "10px",
      textAlign: "center",
    },
    description: {
      fontSize: "16px",
      opacity: 0.9,
      textAlign: "center",
      maxWidth: "400px",
      lineHeight: 1.6,
    },
    formContainer: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "40px",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
    },
    formTitle: {
      fontSize: "24px",
      fontWeight: 600,
      marginBottom: "30px",
      color: "var(--text-dark)",
      textAlign: "center",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-dark)",
    },
    input: {
      width: "100%",
      padding: "12px 16px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      transition: "border-color 0.2s",
      outline: "none",
    },
    inputFocus: {
      borderColor: "var(--primary-color)",
    },
    errorMessage: {
      color: "var(--secondary-color)",
      fontSize: "14px",
      marginTop: "5px",
    },
    submitButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.2s",
      marginTop: "10px",
    },
    forgotPassword: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "14px",
      color: "#666",
    },
    forgotPasswordLink: {
      color: "var(--primary-color)",
      textDecoration: "none",
      fontWeight: 500,
    },
    features: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      marginTop: "40px",
      maxWidth: "400px",
    },
    feature: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    featureIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "20px",
    },
    featureText: {
      fontSize: "16px",
      lineHeight: 1.5,
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>CE</div>
          <h1 style={styles.logoText}>Caisse d'Épargne</h1>
          <p style={styles.logoSubtitle}>de Madagascar</p>
        </div>

        <h2 style={styles.welcomeText}>Bienvenue sur notre plateforme de gestion</h2>
        <p style={styles.description}>
          Gérez efficacement les demandes de stage, les stagiaires et suivez les statistiques en temps réel.
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📊</div>
            <div style={styles.featureText}>Tableau de bord avec statistiques en temps réel</div>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📝</div>
            <div style={styles.featureText}>Gestion simplifiée des demandes de stage</div>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>👥</div>
            <div style={styles.featureText}>Suivi complet des stagiaires et de leur progression</div>
          </div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Connexion</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="exemple@caisse-epargne.mg"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary-color)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                style={styles.input}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary-color)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-color)")}
                required
              />
            </div>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              style={styles.submitButton}
              disabled={isLoading}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <div style={styles.forgotPassword}>
            <a href="#" style={styles.forgotPasswordLink}>
              Mot de passe oublié ?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

