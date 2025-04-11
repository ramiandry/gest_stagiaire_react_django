"use client"

function Header({ onLogout }) {
  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      height: "80px",
      width: "100%",
    },
    headerLogo: {
      display: "flex",
      flexDirection: "column",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: 700,
      color: "var(--primary-color)",
      letterSpacing: "0.5px",
    },
    logoSubtitle: {
      fontSize: "14px",
      color: "var(--secondary-color)",
      fontWeight: 500,
    },
    headerUser: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    userInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    userGreeting: {
      fontSize: "14px",
      color: "#777",
    },
    userName: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--text-dark)",
    },
    logoutButton: {
      backgroundColor: "transparent",
      border: "1px solid var(--border-color)",
      borderRadius: "6px",
      padding: "8px 12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "14px",
      color: "#666",
      transition: "all 0.2s",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "var(--primary-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--primary-color)",
      fontWeight: "bold",
      fontSize: "16px",
    },
  }

  return (
    <header style={styles.header}>
      <div style={styles.headerLogo}>
        <span style={styles.logoText}>Caisse d'Épargne</span>
        <span style={styles.logoSubtitle}>de Madagascar</span>
      </div>
      <div style={styles.headerUser}>
        <div style={styles.userInfo}>
          <span style={styles.userGreeting}>Bienvenue,</span>
          <span style={styles.userName}>{localStorage.getItem('nom_user')}</span>
        </div>
        <div style={styles.avatar}>{localStorage.getItem('nom_user')[0].toLocaleUpperCase()}</div>
        <button
          style={styles.logoutButton}
          onClick={onLogout}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--hover-color)"
            e.currentTarget.style.borderColor = "#ccc"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.borderColor = "var(--border-color)"
          }}
        >
          🚪 Déconnexion
        </button>
      </div>
    </header>
  )
}

export default Header

