"use client"

function Sidebar({ activeItem, setActiveItem }) {
  const styles = {
    sidebar: {
      width: "280px",
      backgroundColor: "var(--primary-color)",
      color: "white",
      height: "100vh",
      overflowY: "auto",
      boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
      flexShrink: 0,
    },
    sidebarHeader: {
      padding: "25px 20px",
    },
    sidebarLogo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "white",
      color: "var(--primary-color)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "18px",
    },
    logoText: {
      display: "flex",
      flexDirection: "column",
    },
    logoMain: {
      fontSize: "16px",
      fontWeight: 600,
    },
    logoSub: {
      fontSize: "12px",
      opacity: 0.9,
    },
    sidebarDivider: {
      height: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      margin: "10px 0",
    },
    sidebarNav: {
      listStyle: "none",
      padding: 0,
    },
    navItem: (isActive) => ({
      padding: "14px 20px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 0.2s",
      borderLeft: isActive ? "4px solid white" : "4px solid transparent",
      marginBottom: "2px",
      backgroundColor: isActive ? "rgba(255, 255, 255, 0.15)" : "transparent",
    }),
    navItemHover: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    icon: {
      marginRight: "12px",
      fontSize: "16px",
      width: "20px",
      textAlign: "center",
    },
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarLogo}>
          <div style={styles.logoIcon}>CE</div>
          <div style={styles.logoText}>
            <span style={styles.logoMain}>Caisse d'Épargne</span>
            <span style={styles.logoSub}>Madagascar</span>
          </div>
        </div>
      </div>
      <div style={styles.sidebarDivider}></div>
      <nav>
        <ul style={styles.sidebarNav}>
          <li
            style={styles.navItem(activeItem === "statistiques")}
            onClick={() => setActiveItem("statistiques")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "statistiques" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>📊</i> Statistiques
          </li>
          <li
            style={styles.navItem(activeItem === "demandes")}
            onClick={() => setActiveItem("demandes")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "demandes" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>📝</i> Demandes
          </li>
          <li
            style={styles.navItem(activeItem === "offre_stage")}
            onClick={() => setActiveItem("offre_stage")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "offre_stage" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>📋</i> Offre stage
          </li>
          <li
            style={styles.navItem(activeItem === "evaluations")}
            onClick={() => setActiveItem("evaluations")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "evaluations" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>⭐</i> Evaluations
          </li>
          <li
            style={styles.navItem(activeItem === "expires")}
            onClick={() => setActiveItem("expires")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "expires" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>⏱️</i> Stages Expirés
          </li>
          <li
            style={styles.navItem(activeItem === "utilisateurs")}
            onClick={() => setActiveItem("utilisateurs")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "utilisateurs" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>👥</i> Utilisateurs
          </li>
          <li
            style={styles.navItem(activeItem === "suivi_stagiaire")}
            onClick={() => setActiveItem("suivi_stagiaire")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "suivi_stagiaire" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>👨‍🎓</i> Suivi stagiaire
          </li>
          {/* <li
            style={styles.navItem(activeItem === "rapport")}
            onClick={() => setActiveItem("rapport")}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor =
                activeItem === "rapport" ? "rgba(255, 255, 255, 0.15)" : "transparent")
            }
          >
            <i style={styles.icon}>📊</i> Rapport
          </li> */}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

