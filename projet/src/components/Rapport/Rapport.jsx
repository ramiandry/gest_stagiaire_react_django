"use client"

import { useState } from "react"
import useMediaQuery from "../../hooks/Responsive"

function Rapport({ reportData }) {
  const [reportType, setReportType] = useState("demandes")
  const [timeFrame, setTimeFrame] = useState("mensuel")
  const [year, setYear] = useState("2023")
  const [quarter, setQuarter] = useState("1")
  const [month, setMonth] = useState("9") // Septembre par défaut
  const [department, setDepartment] = useState("tous")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showExportOptions, setShowExportOptions] = useState(false)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")

  const departments = [
    "Informatique",
    "Finance",
    "Marketing",
    "Ressources Humaines",
    "Comptabilité",
    "Service Client",
    "Direction",
  ]

  const months = [
    { value: "1", label: "Janvier" },
    { value: "2", label: "Février" },
    { value: "3", label: "Mars" },
    { value: "4", label: "Avril" },
    { value: "5", label: "Mai" },
    { value: "6", label: "Juin" },
    { value: "7", label: "Juillet" },
    { value: "8", label: "Août" },
    { value: "9", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" },
  ]

  const quarters = [
    { value: "1", label: "1er trimestre (Jan-Mar)" },
    { value: "2", label: "2ème trimestre (Avr-Juin)" },
    { value: "3", label: "3ème trimestre (Juil-Sep)" },
    { value: "4", label: "4ème trimestre (Oct-Déc)" },
  ]

  const years = ["2023", "2022", "2021"]

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simuler un délai de génération
    setTimeout(() => {
      setIsGenerating(false)
    }, 1500)
  }

  const handleExport = (format) => {
    setShowExportOptions(false)
    alert(`Rapport exporté en format ${format}`)
  }

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
      gap: isMobile ? "10px" : "0",
    },
    title: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: 600,
      color: "var(--text-color, #000)",
      margin: 0,
    },
    controlsContainer: {
      backgroundColor: "var(--bg-card, white)",
      borderRadius: "10px",
      padding: isMobile ? "15px" : "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    },
    controlsTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-color, #000)",
      marginTop: 0,
      marginBottom: isMobile ? "15px" : "20px",
    },
    controlsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isSmallScreen ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(200px, 1fr))",
      gap: isMobile ? "15px" : "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    label: {
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-color, #000)",
    },
    select: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid var(--border-color, #ddd)",
      backgroundColor: "var(--bg-input, white)",
      color: "var(--text-color, #000)",
      fontSize: "14px",
      outline: "none",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: isMobile ? "stretch" : "flex-end",
      gap: "10px",
      marginTop: "20px",
      flexDirection: isMobile ? "column" : "row",
    },
    generateButton: {
      backgroundColor: "var(--primary-color, #1976d2)",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      gap: "8px",
      width: isMobile ? "100%" : "auto",
    },
    exportButton: {
      backgroundColor: "var(--bg-button, white)",
      color: "var(--text-color, #000)",
      border: "1px solid var(--border-color, #ddd)",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      gap: "8px",
      position: "relative",
      width: isMobile ? "100%" : "auto",
    },
    exportOptions: {
      position: "absolute",
      top: isMobile ? "auto" : "100%",
      bottom: isMobile ? "100%" : "auto",
      right: 0,
      marginTop: isMobile ? "0" : "5px",
      marginBottom: isMobile ? "5px" : "0",
      backgroundColor: "var(--bg-card, white)",
      borderRadius: "6px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      minWidth: "150px",
      width: isMobile ? "100%" : "auto",
    },
    exportOption: {
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "var(--text-color, #000)",
    },
    reportContainer: {
      backgroundColor: "var(--bg-card, white)",
      borderRadius: "10px",
      padding: isMobile ? "15px" : "20px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    },
    reportHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      marginBottom: "20px",
      paddingBottom: "15px",
      borderBottom: "1px solid var(--border-color, #ddd)",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "10px" : "0",
    },
    reportTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-color, #000)",
      margin: 0,
    },
    reportDate: {
      fontSize: isMobile ? "12px" : "14px",
      color: "var(--text-secondary, #666)",
    },
    reportContent: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "20px" : "30px",
    },
    summaryCards: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(1, 1fr)"
        : isSmallScreen
          ? "repeat(2, 1fr)"
          : "repeat(auto-fit, minmax(200px, 1fr))",
      gap: isMobile ? "10px" : "15px",
    },
    summaryCard: {
      backgroundColor: "var(--primary-light, #e3f2fd)",
      borderRadius: "8px",
      padding: isMobile ? "12px" : "15px",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    cardLabel: {
      fontSize: isMobile ? "12px" : "14px",
      color: "var(--primary-dark, #0d47a1)",
      fontWeight: 500,
    },
    cardValue: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: 700,
      color: "var(--text-color, #000)",
    },
    chartContainer: {
      marginTop: isMobile ? "15px" : "20px",
      height: isMobile ? "200px" : "300px",
    },
    chart: {
      height: "100%",
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
      fontSize: isMobile ? "10px" : "12px",
      color: "var(--text-secondary, #666)",
      textAlign: "center",
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
      color: "var(--text-color, #000)",
    },
    legendColor: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "3px",
      backgroundColor: color,
    }),
    tableContainer: {
      marginTop: isMobile ? "20px" : "30px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "var(--primary-light, #e3f2fd)",
      padding: isMobile ? "10px" : "12px 15px",
      textAlign: "left",
      fontWeight: 600,
      color: "var(--primary-dark, #0d47a1)",
      fontSize: isMobile ? "12px" : "14px",
      whiteSpace: "nowrap",
    },
    td: {
      padding: isMobile ? "10px" : "12px 15px",
      borderBottom: "1px solid var(--border-color, #ddd)",
      fontSize: isMobile ? "12px" : "14px",
      color: "var(--text-color, #000)",
    },
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 100,
      borderRadius: "10px",
    },
    loadingSpinner: {
      width: isMobile ? "40px" : "50px",
      height: isMobile ? "40px" : "50px",
      border: `${isMobile ? "4px" : "5px"} solid var(--primary-light, #e3f2fd)`,
      borderTopColor: "var(--primary-color, #1976d2)",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    "@keyframes spin": {
      to: { transform: "rotate(360deg)" },
    },
    pieChart: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "150px" : "200px",
      borderRadius: "50%",
      background: "conic-gradient(#4CAF50 0% 54%, #F44336 54% 88%, #FFC107 88% 100%)",
      position: "relative",
      margin: "0 auto",
    },
    pieChartInner: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "90px" : "120px",
      height: isMobile ? "90px" : "120px",
      borderRadius: "50%",
      backgroundColor: "var(--bg-card, white)",
    },
    pieChartLegend: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
      flexWrap: "wrap",
    },
    noDataMessage: {
      textAlign: "center",
      padding: isMobile ? "30px 0" : "50px 0",
      color: "var(--text-secondary, #666)",
      fontSize: isMobile ? "14px" : "16px",
    },
    sectionTitle: {
      fontSize: isMobile ? "14px" : "16px",
      fontWeight: 600,
      color: "var(--text-color, #000)",
      marginTop: isMobile ? "20px" : "30px",
      marginBottom: isMobile ? "10px" : "15px",
      paddingBottom: "10px",
      borderBottom: "1px solid var(--border-color, #ddd)",
    },
    donutChartContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "20px" : "30px",
      position: "relative",
      gap: isMobile ? "20px" : "40px",
    },
    donutChart: {
      width: isMobile ? "150px" : "200px",
      height: isMobile ? "150px" : "200px",
      borderRadius: "50%",
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
      backgroundColor: "var(--bg-card, white)",
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
      color: "var(--text-color, #000)",
    },
    donutLegendValue: {
      color: "var(--text-secondary, #666)",
      fontSize: isMobile ? "12px" : "14px",
    },
    mobileTable: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    mobileTableCard: {
      backgroundColor: "var(--bg-card, white)",
      borderRadius: "8px",
      padding: "15px",
      border: "1px solid var(--border-color, #ddd)",
    },
    mobileTableHeader: {
      fontWeight: 600,
      fontSize: "14px",
      marginBottom: "10px",
      color: "var(--primary-dark, #0d47a1)",
    },
    mobileTableRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "5px 0",
      borderBottom: "1px solid var(--border-color, #ddd)",
      fontSize: "13px",
    },
    mobileTableLabel: {
      color: "var(--text-secondary, #666)",
    },
    mobileTableValue: {
      fontWeight: 500,
      color: "var(--text-color, #000)",
    },
  }

  // Fonction pour obtenir le titre du rapport
  const getReportTitle = () => {
    let title = ""

    switch (reportType) {
      case "demandes":
        title = "Rapport sur les Demandes de Stage"
        break
      case "stages":
        title = "Rapport sur les Stages"
        break
      case "utilisateurs":
        title = "Rapport sur les Utilisateurs"
        break
      default:
        title = "Rapport"
    }

    switch (timeFrame) {
      case "mensuel":
        title += ` - ${months.find((m) => m.value === month)?.label} ${year}`
        break
      case "trimestriel":
        title += ` - ${quarters.find((q) => q.value === quarter)?.label} ${year}`
        break
      case "annuel":
        title += ` - Année ${year}`
        break
      default:
        title += ` - ${year}`
    }

    if (department !== "tous") {
      title += ` - Département ${department}`
    }

    return title
  }

  // Rendu du contenu du rapport en fonction du type sélectionné
  const renderReportContent = () => {
    switch (reportType) {
      case "demandes":
        return renderRequestsReport()
      case "stages":
        return renderInternshipsReport()
      case "utilisateurs":
        return renderUsersReport()
      default:
        return <div style={styles.noDataMessage}>Sélectionnez un type de rapport</div>
    }
  }

  // Rapport sur les demandes
  const renderRequestsReport = () => {
    const data = reportData.requestsMonthly
    const currentMonthData = data[Number.parseInt(month) - 1]

    // Calculer les totaux pour l'année
    const yearlyTotals = data.reduce(
      (acc, month) => {
        return {
          total: acc.total + month.total,
          accepted: acc.accepted + month.accepted,
          rejected: acc.rejected + month.rejected,
          pending: acc.pending + month.pending,
        }
      },
      { total: 0, accepted: 0, rejected: 0, pending: 0 },
    )

    // Déterminer quelles données afficher en fonction de la période
    let displayData
    let chartData

    if (timeFrame === "mensuel") {
      displayData = currentMonthData
      chartData = [currentMonthData]
    } else if (timeFrame === "trimestriel") {
      const startMonth = (Number.parseInt(quarter) - 1) * 3
      displayData = {
        total: data.slice(startMonth, startMonth + 3).reduce((sum, month) => sum + month.total, 0),
        accepted: data.slice(startMonth, startMonth + 3).reduce((sum, month) => sum + month.accepted, 0),
        rejected: data.slice(startMonth, startMonth + 3).reduce((sum, month) => sum + month.rejected, 0),
        pending: data.slice(startMonth, startMonth + 3).reduce((sum, month) => sum + month.pending, 0),
      }
      chartData = data.slice(startMonth, startMonth + 3)
    } else {
      displayData = yearlyTotals
      chartData = data
    }

    // Trouver la valeur maximale pour le graphique
    const maxValue = Math.max(...chartData.map((item) => item.total))

    return (
      <div style={styles.reportContent}>
        <div style={styles.summaryCards}>
          <div style={styles.summaryCard}>
            <div style={styles.cardLabel}>Total des demandes</div>
            <div style={styles.cardValue}>{displayData.total}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#E8F5E9" }}>
            <div style={{ ...styles.cardLabel, color: "#2E7D32" }}>Demandes acceptées</div>
            <div style={styles.cardValue}>{displayData.accepted}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#FFEBEE" }}>
            <div style={{ ...styles.cardLabel, color: "#C62828" }}>Demandes refusées</div>
            <div style={styles.cardValue}>{displayData.rejected}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#FFF8E1" }}>
            <div style={{ ...styles.cardLabel, color: "#F57F17" }}>Demandes en attente</div>
            <div style={styles.cardValue}>{displayData.pending}</div>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Répartition des demandes</h3>

        {timeFrame !== "mensuel" ? (
          <div style={styles.chartContainer}>
            <div style={{ ...styles.chart, position: "relative" }}>
              {chartData.map((item, index) => (
                <div key={index} style={styles.chartColumn}>
                  <div style={styles.chartBar(item.total > 0 ? (item.total / maxValue) * 80 : 0, "#2196F3")}></div>
                  <div style={styles.chartLabel}>
                    {timeFrame === "trimestriel"
                      ? months[(Number.parseInt(quarter) - 1) * 3 + index].label
                      : item.month}
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <div style={styles.legendColor("#2196F3")}></div>
                <span>Total des demandes</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.donutChartContainer}>
            <div
              style={{
                ...styles.donutChart,
                background: `conic-gradient(
                #4CAF50 0% ${(displayData.accepted / displayData.total) * 100}%, 
                #F44336 ${(displayData.accepted / displayData.total) * 100}% ${((displayData.accepted + displayData.rejected) / displayData.total) * 100}%, 
                #FFC107 ${((displayData.accepted + displayData.rejected) / displayData.total) * 100}% 100%
              )`,
              }}
            >
              <div style={styles.donutChartInner}></div>
            </div>

            <div style={styles.donutLegend}>
              <div style={styles.donutLegendItem}>
                <div style={styles.donutLegendColor("#4CAF50")}></div>
                <div style={styles.donutLegendText}>
                  <div style={styles.donutLegendTitle}>Acceptées</div>
                  <div style={styles.donutLegendValue}>
                    {displayData.accepted} ({Math.round((displayData.accepted / displayData.total) * 100)}%)
                  </div>
                </div>
              </div>

              <div style={styles.donutLegendItem}>
                <div style={styles.donutLegendColor("#F44336")}></div>
                <div style={styles.donutLegendText}>
                  <div style={styles.donutLegendTitle}>Refusées</div>
                  <div style={styles.donutLegendValue}>
                    {displayData.rejected} ({Math.round((displayData.rejected / displayData.total) * 100)}%)
                  </div>
                </div>
              </div>

              <div style={styles.donutLegendItem}>
                <div style={styles.donutLegendColor("#FFC107")}></div>
                <div style={styles.donutLegendText}>
                  <div style={styles.donutLegendTitle}>En attente</div>
                  <div style={styles.donutLegendValue}>
                    {displayData.pending} ({Math.round((displayData.pending / displayData.total) * 100)}%)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <h3 style={styles.sectionTitle}>Détails des demandes par mois</h3>

        {isMobile ? (
          <div style={styles.mobileTable}>
            {timeFrame === "mensuel" ? (
              <div style={styles.mobileTableCard}>
                <div style={styles.mobileTableHeader}>{months.find((m) => m.value === month)?.label}</div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Total:</div>
                  <div style={styles.mobileTableValue}>{currentMonthData.total}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Acceptées:</div>
                  <div style={styles.mobileTableValue}>{currentMonthData.accepted}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Refusées:</div>
                  <div style={styles.mobileTableValue}>{currentMonthData.rejected}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>En attente:</div>
                  <div style={styles.mobileTableValue}>{currentMonthData.pending}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Taux d'acceptation:</div>
                  <div style={styles.mobileTableValue}>
                    {currentMonthData.total > 0
                      ? `${Math.round((currentMonthData.accepted / currentMonthData.total) * 100)}%`
                      : "N/A"}
                  </div>
                </div>
              </div>
            ) : timeFrame === "trimestriel" ? (
              data
                .slice((Number.parseInt(quarter) - 1) * 3, (Number.parseInt(quarter) - 1) * 3 + 3)
                .map((item, index) => (
                  <div key={index} style={styles.mobileTableCard}>
                    <div style={styles.mobileTableHeader}>{item.month}</div>
                    <div style={styles.mobileTableRow}>
                      <div style={styles.mobileTableLabel}>Total:</div>
                      <div style={styles.mobileTableValue}>{item.total}</div>
                    </div>
                    <div style={styles.mobileTableRow}>
                      <div style={styles.mobileTableLabel}>Acceptées:</div>
                      <div style={styles.mobileTableValue}>{item.accepted}</div>
                    </div>
                    <div style={styles.mobileTableRow}>
                      <div style={styles.mobileTableLabel}>Refusées:</div>
                      <div style={styles.mobileTableValue}>{item.rejected}</div>
                    </div>
                    <div style={styles.mobileTableRow}>
                      <div style={styles.mobileTableLabel}>En attente:</div>
                      <div style={styles.mobileTableValue}>{item.pending}</div>
                    </div>
                    <div style={styles.mobileTableRow}>
                      <div style={styles.mobileTableLabel}>Taux d'acceptation:</div>
                      <div style={styles.mobileTableValue}>
                        {item.total > 0 ? `${Math.round((item.accepted / item.total) * 100)}%` : "N/A"}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              data.map((item, index) => (
                <div key={index} style={styles.mobileTableCard}>
                  <div style={styles.mobileTableHeader}>{item.month}</div>
                  <div style={styles.mobileTableRow}>
                    <div style={styles.mobileTableLabel}>Total:</div>
                    <div style={styles.mobileTableValue}>{item.total}</div>
                  </div>
                  <div style={styles.mobileTableRow}>
                    <div style={styles.mobileTableLabel}>Acceptées:</div>
                    <div style={styles.mobileTableValue}>{item.accepted}</div>
                  </div>
                  <div style={styles.mobileTableRow}>
                    <div style={styles.mobileTableLabel}>Refusées:</div>
                    <div style={styles.mobileTableValue}>{item.rejected}</div>
                  </div>
                  <div style={styles.mobileTableRow}>
                    <div style={styles.mobileTableLabel}>En attente:</div>
                    <div style={styles.mobileTableValue}>{item.pending}</div>
                  </div>
                  <div style={styles.mobileTableRow}>
                    <div style={styles.mobileTableLabel}>Taux d'acceptation:</div>
                    <div style={styles.mobileTableValue}>
                      {item.total > 0 ? `${Math.round((item.accepted / item.total) * 100)}%` : "N/A"}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div style={{ ...styles.mobileTableCard, fontWeight: 600 }}>
              <div style={styles.mobileTableHeader}>Total</div>
              <div style={styles.mobileTableRow}>
                <div style={styles.mobileTableLabel}>Total:</div>
                <div style={styles.mobileTableValue}>{displayData.total}</div>
              </div>
              <div style={styles.mobileTableRow}>
                <div style={styles.mobileTableLabel}>Acceptées:</div>
                <div style={styles.mobileTableValue}>{displayData.accepted}</div>
              </div>
              <div style={styles.mobileTableRow}>
                <div style={styles.mobileTableLabel}>Refusées:</div>
                <div style={styles.mobileTableValue}>{displayData.rejected}</div>
              </div>
              <div style={styles.mobileTableRow}>
                <div style={styles.mobileTableLabel}>En attente:</div>
                <div style={styles.mobileTableValue}>{displayData.pending}</div>
              </div>
              <div style={styles.mobileTableRow}>
                <div style={styles.mobileTableLabel}>Taux d'acceptation:</div>
                <div style={styles.mobileTableValue}>
                  {displayData.total > 0 ? `${Math.round((displayData.accepted / displayData.total) * 100)}%` : "N/A"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Mois</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Acceptées</th>
                  <th style={styles.th}>Refusées</th>
                  <th style={styles.th}>En attente</th>
                  <th style={styles.th}>Taux d'acceptation</th>
                </tr>
              </thead>
              <tbody>
                {timeFrame === "mensuel" ? (
                  <tr>
                    <td style={styles.td}>{months.find((m) => m.value === month)?.label}</td>
                    <td style={styles.td}>{currentMonthData.total}</td>
                    <td style={styles.td}>{currentMonthData.accepted}</td>
                    <td style={styles.td}>{currentMonthData.rejected}</td>
                    <td style={styles.td}>{currentMonthData.pending}</td>
                    <td style={styles.td}>
                      {currentMonthData.total > 0
                        ? `${Math.round((currentMonthData.accepted / currentMonthData.total) * 100)}%`
                        : "N/A"}
                    </td>
                  </tr>
                ) : timeFrame === "trimestriel" ? (
                  data
                    .slice((Number.parseInt(quarter) - 1) * 3, (Number.parseInt(quarter) - 1) * 3 + 3)
                    .map((item, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{item.month}</td>
                        <td style={styles.td}>{item.total}</td>
                        <td style={styles.td}>{item.accepted}</td>
                        <td style={styles.td}>{item.rejected}</td>
                        <td style={styles.td}>{item.pending}</td>
                        <td style={styles.td}>
                          {item.total > 0 ? `${Math.round((item.accepted / item.total) * 100)}%` : "N/A"}
                        </td>
                      </tr>
                    ))
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{item.month}</td>
                      <td style={styles.td}>{item.total}</td>
                      <td style={styles.td}>{item.accepted}</td>
                      <td style={styles.td}>{item.rejected}</td>
                      <td style={styles.td}>{item.pending}</td>
                      <td style={styles.td}>
                        {item.total > 0 ? `${Math.round((item.accepted / item.total) * 100)}%` : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td style={{ ...styles.td, fontWeight: 600 }}>Total</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{displayData.total}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{displayData.accepted}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{displayData.rejected}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{displayData.pending}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>
                    {displayData.total > 0 ? `${Math.round((displayData.accepted / displayData.total) * 100)}%` : "N/A"}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    )
  }

  // Rapport sur les stages
  const renderInternshipsReport = () => {
    const { internshipStats, departmentStats } = reportData

    return (
      <div style={styles.reportContent}>
        <div style={styles.summaryCards}>
          <div style={styles.summaryCard}>
            <div style={styles.cardLabel}>Total des stages</div>
            <div style={styles.cardValue}>{internshipStats.completed + internshipStats.ongoing}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#E8F5E9" }}>
            <div style={{ ...styles.cardLabel, color: "#2E7D32" }}>Stages terminés</div>
            <div style={styles.cardValue}>{internshipStats.completed}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#E3F2FD" }}>
            <div style={{ ...styles.cardLabel, color: "#1565C0" }}>Stages en cours</div>
            <div style={styles.cardValue}>{internshipStats.ongoing}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#FFEBEE" }}>
            <div style={{ ...styles.cardLabel, color: "#C62828" }}>Terminés prématurément</div>
            <div style={styles.cardValue}>{internshipStats.earlyTermination}</div>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Durée des stages</h3>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
          <div
            style={{
              backgroundColor: "var(--primary-light, #e3f2fd)",
              borderRadius: "8px",
              padding: isMobile ? "15px" : "20px",
              textAlign: "center",
              minWidth: isMobile ? "150px" : "200px",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "12px" : "14px",
                color: "var(--primary-dark, #0d47a1)",
                marginBottom: "10px",
              }}
            >
              Durée totale (jours)
            </div>
            <div style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: 700, color: "var(--text-color, #000)" }}>
              {internshipStats.totalDuration}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--primary-light, #e3f2fd)",
              borderRadius: "8px",
              padding: isMobile ? "15px" : "20px",
              textAlign: "center",
              minWidth: isMobile ? "150px" : "200px",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "12px" : "14px",
                color: "var(--primary-dark, #0d47a1)",
                marginBottom: "10px",
              }}
            >
              Durée moyenne (jours)
            </div>
            <div style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: 700, color: "var(--text-color, #000)" }}>
              {internshipStats.averageDuration}
            </div>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Répartition par département</h3>

        <div style={styles.donutChartContainer}>
          <div
            style={{
              ...styles.donutChart,
              background: `conic-gradient(
              #4CAF50 0% ${internshipStats.departmentDistribution[0].percentage}%, 
              #2196F3 ${internshipStats.departmentDistribution[0].percentage}% ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage}%, 
              #F44336 ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage}% ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage}%,
              #FFC107 ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage}% ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage + internshipStats.departmentDistribution[3].percentage}%,
              #9C27B0 ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage + internshipStats.departmentDistribution[3].percentage}% ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage + internshipStats.departmentDistribution[3].percentage + internshipStats.departmentDistribution[4].percentage}%,
              #FF5722 ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage + internshipStats.departmentDistribution[3].percentage + internshipStats.departmentDistribution[4].percentage}% ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage + internshipStats.departmentDistribution[3].percentage + internshipStats.departmentDistribution[4].percentage + internshipStats.departmentDistribution[5].percentage}%,
              #607D8B ${internshipStats.departmentDistribution[0].percentage + internshipStats.departmentDistribution[1].percentage + internshipStats.departmentDistribution[2].percentage + internshipStats.departmentDistribution[3].percentage + internshipStats.departmentDistribution[4].percentage + internshipStats.departmentDistribution[5].percentage}% 100%
            )`,
            }}
          >
            <div style={styles.donutChartInner}></div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "10px",
            }}
          >
            {internshipStats.departmentDistribution.map((item, index) => {
              const colors = ["#4CAF50", "#2196F3", "#F44336", "#FFC107", "#9C27B0", "#FF5722", "#607D8B"]
              return (
                <div key={index} style={styles.donutLegendItem}>
                  <div style={styles.donutLegendColor(colors[index])}></div>
                  <div style={styles.donutLegendText}>
                    <div style={styles.donutLegendTitle}>{item.department}</div>
                    <div style={styles.donutLegendValue}>{item.percentage}%</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Détails par département</h3>

        {isMobile ? (
          <div style={styles.mobileTable}>
            {departmentStats.map((item, index) => (
              <div key={index} style={styles.mobileTableCard}>
                <div style={styles.mobileTableHeader}>{item.department}</div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Nombre de stagiaires:</div>
                  <div style={styles.mobileTableValue}>{item.interns}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Nombre de demandes:</div>
                  <div style={styles.mobileTableValue}>{item.requests}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Taux de conversion:</div>
                  <div style={styles.mobileTableValue}>{Math.round((item.interns / item.requests) * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Département</th>
                  <th style={styles.th}>Nombre de stagiaires</th>
                  <th style={styles.th}>Nombre de demandes</th>
                  <th style={styles.th}>Taux de conversion</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.department}</td>
                    <td style={styles.td}>{item.interns}</td>
                    <td style={styles.td}>{item.requests}</td>
                    <td style={styles.td}>{Math.round((item.interns / item.requests) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  // Rapport sur les utilisateurs
  const renderUsersReport = () => {
    const { userStats } = reportData

    return (
      <div style={styles.reportContent}>
        <div style={styles.summaryCards}>
          <div style={styles.summaryCard}>
            <div style={styles.cardLabel}>Total des utilisateurs</div>
            <div style={styles.cardValue}>{userStats.totalUsers}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#E8F5E9" }}>
            <div style={{ ...styles.cardLabel, color: "#2E7D32" }}>Utilisateurs actifs</div>
            <div style={styles.cardValue}>{userStats.activeUsers}</div>
          </div>
          <div style={{ ...styles.summaryCard, backgroundColor: "#FFEBEE" }}>
            <div style={{ ...styles.cardLabel, color: "#C62828" }}>Utilisateurs inactifs</div>
            <div style={styles.cardValue}>{userStats.inactiveUsers}</div>
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Répartition par rôle</h3>

        <div style={styles.donutChartContainer}>
          <div
            style={{
              ...styles.donutChart,
              background: `conic-gradient(
              #4CAF50 0% ${(userStats.roleDistribution[0].count / userStats.totalUsers) * 100}%, 
              #2196F3 ${(userStats.roleDistribution[0].count / userStats.totalUsers) * 100}% ${((userStats.roleDistribution[0].count + userStats.roleDistribution[1].count) / userStats.totalUsers) * 100}%, 
              #F44336 ${((userStats.roleDistribution[0].count + userStats.roleDistribution[1].count) / userStats.totalUsers) * 100}% ${((userStats.roleDistribution[0].count + userStats.roleDistribution[1].count + userStats.roleDistribution[2].count) / userStats.totalUsers) * 100}%,
              #FFC107 ${((userStats.roleDistribution[0].count + userStats.roleDistribution[1].count + userStats.roleDistribution[2].count) / userStats.totalUsers) * 100}% 100%
            )`,
            }}
          >
            <div style={styles.donutChartInner}></div>
          </div>

          <div style={styles.donutLegend}>
            {userStats.roleDistribution.map((item, index) => {
              const colors = ["#4CAF50", "#2196F3", "#F44336", "#FFC107"]
              return (
                <div key={index} style={styles.donutLegendItem}>
                  <div style={styles.donutLegendColor(colors[index])}></div>
                  <div style={styles.donutLegendText}>
                    <div style={styles.donutLegendTitle}>{item.role}</div>
                    <div style={styles.donutLegendValue}>
                      {item.count} ({Math.round((item.count / userStats.totalUsers) * 100)}%)
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <h3 style={styles.sectionTitle}>Répartition par département</h3>

        {isMobile ? (
          <div style={styles.mobileTable}>
            {userStats.departmentDistribution.map((item, index) => (
              <div key={index} style={styles.mobileTableCard}>
                <div style={styles.mobileTableHeader}>{item.department}</div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Nombre d'utilisateurs:</div>
                  <div style={styles.mobileTableValue}>{item.count}</div>
                </div>
                <div style={styles.mobileTableRow}>
                  <div style={styles.mobileTableLabel}>Pourcentage:</div>
                  <div style={styles.mobileTableValue}>{Math.round((item.count / userStats.totalUsers) * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Département</th>
                  <th style={styles.th}>Nombre d'utilisateurs</th>
                  <th style={styles.th}>Pourcentage</th>
                </tr>
              </thead>
              <tbody>
                {userStats.departmentDistribution.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{item.department}</td>
                    <td style={styles.td}>{item.count}</td>
                    <td style={styles.td}>{Math.round((item.count / userStats.totalUsers) * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Rapports</h1>
      </div>

      <div style={styles.controlsContainer}>
        <h2 style={styles.controlsTitle}>Paramètres du rapport</h2>
        <div style={styles.controlsGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="reportType">
              Type de rapport
            </label>
            <select
              id="reportType"
              style={styles.select}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="demandes">Demandes de stage</option>
              <option value="stages">Stages</option>
              <option value="utilisateurs">Utilisateurs</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="timeFrame">
              Période
            </label>
            <select
              id="timeFrame"
              style={styles.select}
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="mensuel">Mensuel</option>
              <option value="trimestriel">Trimestriel</option>
              <option value="annuel">Annuel</option>
            </select>
          </div>

          {timeFrame === "mensuel" && (
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="month">
                Mois
              </label>
              <select id="month" style={styles.select} value={month} onChange={(e) => setMonth(e.target.value)}>
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {timeFrame === "trimestriel" && (
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="quarter">
                Trimestre
              </label>
              <select id="quarter" style={styles.select} value={quarter} onChange={(e) => setQuarter(e.target.value)}>
                {quarters.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="year">
              Année
            </label>
            <select id="year" style={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="department">
              Département
            </label>
            <select
              id="department"
              style={styles.select}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="tous">Tous les départements</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <div style={{ position: "relative", width: isMobile ? "100%" : "auto" }}>
            <button
              style={styles.exportButton}
              onClick={() => setShowExportOptions(!showExportOptions)}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color, #f5f5f5)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-button, white)")}
            >
              📥 Exporter
            </button>

            {showExportOptions && (
              <div style={styles.exportOptions}>
                <div
                  style={styles.exportOption}
                  onClick={() => handleExport("PDF")}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color, #f5f5f5)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-card, white)")}
                >
                  📄 PDF
                </div>
                <div
                  style={styles.exportOption}
                  onClick={() => handleExport("Excel")}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color, #f5f5f5)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-card, white)")}
                >
                  📊 Excel
                </div>
                <div
                  style={styles.exportOption}
                  onClick={() => handleExport("CSV")}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color, #f5f5f5)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-card, white)")}
                >
                  📋 CSV
                </div>
              </div>
            )}
          </div>

          <button
            style={styles.generateButton}
            onClick={handleGenerateReport}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark, #0d47a1)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color, #1976d2)")}
          >
            🔄 Générer le rapport
          </button>
        </div>
      </div>

      <div style={{ position: "relative", marginTop: "20px" }}>
        <div style={styles.reportContainer}>
          <div style={styles.reportHeader}>
            <h2 style={styles.reportTitle}>{getReportTitle()}</h2>
            <div style={styles.reportDate}>Généré le {new Date().toLocaleDateString("fr-FR")}</div>
          </div>

          {renderReportContent()}
        </div>

        {isGenerating && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Rapport

