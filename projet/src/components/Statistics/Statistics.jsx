import { useEffect, useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import useFetchCand from "../../hooks/useFetchCand"
import useFetchStagiaire from "../../hooks/useFetchStagiaire"
import BarChart from "../chart/BarChart"
import DonutChart from "../chart/DonutChart"

function Statistics({ stats }) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")
  const { fetchCandidature, data: dataCand } = useFetchCand()

  const {fetchStagiaire, data: dataStagiaire} = useFetchStagiaire()
  const [stagiaires, setStagiaires] = useState([])
  const [candidatures, setCandidatures] = useState([]);

  useEffect(() => {
    if (dataCand) {
      setCandidatures(dataCand)
    }else{
      fetchCandidature()
    }
  }, [dataCand])

  useEffect(() => {
    if (dataStagiaire) {
      setStagiaires(dataStagiaire);
    } else {
      fetchStagiaire();
    }
  }, [dataStagiaire]);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "0",
    },
    title: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: 600,
      color: "var(--text-dark)",
      margin: 0,
    },
    dateSelector: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: isMobile ? "wrap" : "nowrap",
      width: isMobile ? "100%" : "auto",
    },
    dateButton: {
      padding: isMobile ? "6px 12px" : "8px 16px",
      backgroundColor: "white",
      border: "1px solid var(--border-color)",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: 500,
      flex: isMobile ? "1" : "none",
      textAlign: "center",
    },
    activeDate: {
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-color)",
      borderColor: "var(--primary-color)",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(1, 1fr)"
        : isSmallScreen
          ? "repeat(2, 1fr)"
          : "repeat(auto-fit, minmax(240px, 1fr))",
      gap: isMobile ? "15px" : "20px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: isMobile ? "15px" : "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    iconContainer: (color) => ({
      width: isMobile ? "40px" : "50px",
      height: isMobile ? "40px" : "50px",
      borderRadius: "10px",
      backgroundColor: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "20px" : "24px",
    }),
    cardTitle: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: 500,
      color: "#666",
      margin: 0,
    },
    cardValue: {
      fontSize: isMobile ? "24px" : "32px",
      fontWeight: 700,
      color: "var(--text-dark)",
      margin: 0,
    },
    chartContainer: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: isMobile ? "15px" : "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      marginTop: "20px",
    },
    chartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    chartTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      margin: 0,
    },
    chart: {
      // height: isMobile ? "200px" : "300px",
      display: "flex",
      alignItems: "flex-end",
      gap: isMobile ? "10px" : "15px",
      padding: "20px 0",
      overflowX: isMobile ? "auto" : "visible",
      paddingBottom: isMobile ? "30px" : "20px",
    },
    chartColumn: {
      flex: 1,
      minWidth: isMobile ? "50px" : "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
    chartBar: (height, color) => ({
      width: "100%",
      height: `${height}%`,
      backgroundColor: color,
      borderRadius: "6px 6px 0 0",
      transition: "height 0.3s ease",
    }),
    chartLabel: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#666",
      position: isMobile ? "absolute" : "relative",
      bottom: isMobile ? "10px" : "auto",
      transform: isMobile ? "rotate(-45deg)" : "none",
      transformOrigin: "left top",
      whiteSpace: "nowrap",
    },
    legend: {
      display: "flex",
      justifyContent: "center",
      gap: isMobile ? "15px" : "20px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: isMobile ? "12px" : "14px",
    },
    legendColor: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "3px",
      backgroundColor: color,
    }),
    donutChartContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "30px",
      position: "relative",
      gap: isMobile ? "20px" : "40px",
    },
    donutChart: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "150px" : "200px",
      borderRadius: "50%",
      background: "conic-gradient(#4CAF50 0% 54%, #F44336 54% 88%, #FFC107 88% 100%)",
      position: "relative",
    },
    donutChartInner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "90px" : "120px",
      height: isMobile ? "90px" : "120px",
      borderRadius: "50%",
      backgroundColor: "white",
    },
    donutLegend: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    donutLegendItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    donutLegendColor: (color) => ({
      width: "15px",
      height: "15px",
      backgroundColor: color,
      borderRadius: "3px",
    }),
    donutLegendText: {
      display: "flex",
      flexDirection: "column",
    },
    donutLegendTitle: {
      fontWeight: 500,
      fontSize: isMobile ? "14px" : "16px",
    },
    donutLegendValue: {
      color: "#666",
      fontSize: isMobile ? "12px" : "14px",
    },
  }

  // Trouver la valeur maximale pour le graphique
  const maxChartValue = Math.max(
    ...stats.monthlyStats.map((item) => Math.max(item.requests, item.accepted, item.rejected)),
  )

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Tableau de bord</h1>
        <div style={styles.dateSelector}>
          {/* <button style={{ ...styles.dateButton, ...styles.activeDate }}>Cette année</button>
          <button style={styles.dateButton}>Ce mois</button>
          <button style={styles.dateButton}>Cette semaine</button> */}
        </div>
      </div>

      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer("var(--primary-light)")}>👥</div>
            <h3 style={styles.cardTitle}>Stagiaires</h3>
          </div>
          <p style={styles.cardValue}>{
            stagiaires?.filter((dt) => {
              return candidatures?.some((dcm) => dcm.candidat == dt.id && dcm.statut.trim() !== "Refuser" && dcm.statut.trim() !== "Terminer");
            }).length
          }</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer("#E3F2FD")}>📝</div>
            <h3 style={styles.cardTitle}>Demandes totales</h3>
          </div>
          <p style={styles.cardValue}>{candidatures.length}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer("#E8F5E9")}>✅</div>
            <h3 style={styles.cardTitle}>Demandes acceptées</h3>
          </div>
          <p style={styles.cardValue}>{
            candidatures?.filter((dcm) => dcm.statut.trim() == "Accepter").length
          }</p>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconContainer("#FFEBEE")}>❌</div>
            <h3 style={styles.cardTitle}>Demandes refusées</h3>
          </div>
          <p style={styles.cardValue}>{
             candidatures?.filter((dcm) => dcm.statut.trim() == "Refuser").length
          }</p>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <div style={styles.chartHeader}>
          <h2 style={styles.chartTitle}>Évolution des demandes</h2>
        </div>
        <div style={{ ...styles.chart, position: "relative" }}>
        <BarChart />
        </div>
        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div style={styles.legendColor("#2196F3")}></div>
            <span>Demandes</span>
          </div>
          <div style={styles.legendItem}>
            <div style={styles.legendColor("#4CAF50")}></div>
            <span>Acceptées</span>
          </div>
          <div style={styles.legendItem}>
            <div style={styles.legendColor("#F44336")}></div>
            <span>Refusées</span>
          </div>
        </div>
      </div>

      <div style={styles.chartContainer}>
        <div style={styles.chartHeader}>
          <h2 style={styles.chartTitle}>Répartition des demandes</h2>
        </div>
        <div style={styles.donutChartContainer}>
          {/* Cercle pour le graphique en donut */}

            {/* Trou au milieu pour créer l'effet donut */}
            <DonutChart/>


          {/* Légende à droite */}
          <div style={styles.donutLegend}>
            <div style={styles.donutLegendItem}>
              <div style={styles.donutLegendColor("#4CAF50")}></div>
              <div style={styles.donutLegendText}>
                <div style={styles.donutLegendTitle}>Acceptées</div>
                <div style={styles.donutLegendValue}>
                  {candidatures.filter(cand => cand.statut.trim() == "Accepter").length} ({Math.round((candidatures.filter(cand => cand.statut.trim() == "Accepter").length / candidatures.length) * 100)}%)
                </div>
              </div>
            </div>

            <div style={styles.donutLegendItem}>
              <div style={styles.donutLegendColor("#F44336")}></div>
              <div style={styles.donutLegendText}>
                <div style={styles.donutLegendTitle}>Refusées</div>
                <div style={styles.donutLegendValue}>
                  {candidatures.filter(cand => cand.statut.trim() == "Refuser").length} ({Math.round((candidatures.filter(cand => cand.statut.trim() == "Refuser").length / candidatures.length) * 100)}%)
                </div>
              </div>
            </div>

            <div style={styles.donutLegendItem}>
              <div style={styles.donutLegendColor("#FFC107")}></div>
              <div style={styles.donutLegendText}>
                <div style={styles.donutLegendTitle}>En attente</div>
                <div style={styles.donutLegendValue}>
                  {candidatures.filter(cand => cand.statut.trim() == "En attente").length} ({Math.round((candidatures.filter(cand => cand.statut.trim() == "En attente").length / candidatures.length) * 100)}%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics

