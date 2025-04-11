// Remplacer le composant SuiviStagiaire par cette version qui correspond mieux à la structure de l'InternDashboard
"use client"

import { useEffect, useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import useFetchSuivi from "../../hooks/useFetchSuivi"
import useFetchStagiaire from "../../hooks/useFetchStagiaire"
import useFetchJournal from "../../hooks/useFetchJournal"
import useFetchEvaluation from "../../hooks/useFetchEvaluation"
import useFetchStage from "../../hooks/useFetchStage"
import useFetchCand from "../../hooks/useFetchCand"
import useUpdateCand from "../../hooks/useUpdateCand"
import useUpdateEvaluation from "../../hooks/useUpdateEvaluation"
import * as XLSX from 'xlsx';

function SuiviStagiaire() {
  const [activeTab, setActiveTab] = useState("liste")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStagiaire, setSelectedStagiaire] = useState(null)
  const [detailsTab, setDetailsTab] = useState("journal")
  const [currentPage, setCurrentPage] = useState(1)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [adminComment, setAdminComment] = useState("")
  const [suivis, setSuivis] = useState([])
  const [journals, setJournals] = useState([])
  const [evaluations, setEvaluations] = useState([])
  const [stages, setStages] = useState([])
  const [cands, setCands] = useState([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")
  const {fetchSuivi, data: dataSuivi} = useFetchSuivi()
  const {fetchStagiaire, data: dataStagiaire} = useFetchStagiaire()
  const {fetchCandidature, data: dataCand} = useFetchCand()
  const {fetchStage, data: dataStage} = useFetchStage()
  const {fetchJournal, data: dataJournal} = useFetchJournal()
  const {fetchEvaluation, data: dataEvaluation} = useFetchEvaluation()
  const {updateEvaluation} = useUpdateEvaluation()

  // Données fictives des stagiaires
  const [stagiaires, setStagiaires] = useState([])

  const itemsPerPage = 10
  const totalPages = Math.ceil(stagiaires.length / itemsPerPage)

  const filteredStagiaires = stagiaires.filter(
    (stagiaire) =>
      stagiaire?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stagiaire?.departement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stagiaire?.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination des résultats
  const paginatedStagiaires = filteredStagiaires.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Fonction pour voir les détails d'un stagiaire
  const handleViewDetails = (id) => {
    console.log(id)
    const stagiaire = {
        journalEntries: journals.filter((journal)=> journal.stagiaire == id),
        ...suivis.findLast((sv)=>sv.stagiaire == id),
        status : suivis.findLast((sv)=>sv.stagiaire == id)?.statut,
        skills: {...evaluations.findLast((evl)=>evl.stagiaire == id)},
        ...stagiaires.find((s) => s.id == id),
        id: id
    }
    console.log("selected",stagiaire)
    setSelectedStagiaire(stagiaire)
    setActiveTab("details")
    setDetailsTab("journal")
  }

  // Fonction pour valider un rapport
  const handleValidateReport = (id) => {
    setStagiaires(
      stagiaires.map((stagiaire) => (stagiaire.id === id ? { ...stagiaire, reportStatus: "Validé" } : stagiaire)),
    )
    alert(`Rapport du stagiaire ${id} validé`)
  }

  // Fonction pour rejeter un rapport
  const handleRejectReport = (id, feedback) => {
    setStagiaires(
      stagiaires.map((stagiaire) =>
        stagiaire.id === id ? { ...stagiaire, reportStatus: "Rejeté", adminFeedback: feedback } : stagiaire,
      ),
    )
    alert(`Rapport du stagiaire ${id} rejeté`)
  }

  // Fonction pour exporter les données
  const handleExport = (format) => {
    alert(`Exportation des données au format ${format}`)
    setShowExportOptions(false)
  }

  // Fonction pour mettre à jour l'évaluation admin
  const handleAdminRatingChange = (skillId, value) => {
    if (!selectedStagiaire) return

    /*setStagiaires(
      stagiaires.map((stagiaire) =>
        stagiaire.id === selectedStagiaire.id
          ? {
              ...stagiaire,
              skills: stagiaire.skills.map((skill) =>
                skill.id === skillId ? { ...skill, adminRating: Number(value) } : skill,
              ),
            }
          : stagiaire,
      ),
    )*/

    setEvaluations(
      evaluations.map((evaluation) => evaluation.id === selectedStagiaire.skills.id ? { ...evaluation, [skillId]: Number(value) } : evaluation)
    )

    updateEvaluation({ ...evaluations.find((evaluation) => evaluation.id === selectedStagiaire.skills.id), [skillId]: Number(value) })

    setSelectedStagiaire((prev) => ({
      ...prev,
      skills: { ...evaluations.find((evaluation) => evaluation.id === selectedStagiaire.skills.id), [skillId]: Number(value) },
    }))
  }

  // Fonction pour ajouter un commentaire admin sur une entrée de journal
  const handleAddJournalComment = (entryId) => {
    if (!selectedStagiaire || !adminComment.trim()) return

    setStagiaires(
      stagiaires.map((stagiaire) =>
        stagiaire.id === selectedStagiaire.id
          ? {
              ...stagiaire,
              journalEntries: stagiaire.journalEntries.map((entry) =>
                entry.id === entryId ? { ...entry, adminComment: adminComment } : entry,
              ),
            }
          : stagiaire,
      ),
    )

    setSelectedStagiaire((prev) => ({
      ...prev,
      journalEntries: prev.journalEntries.map((entry) =>
        entry.id === entryId ? { ...entry, adminComment: adminComment } : entry,
      ),
    }))

    setAdminComment("")
    alert("Commentaire ajouté avec succès")
  }

  // Fonctions de pagination
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if(dataStage){
      setStages(dataStage)
    }
    else{
      fetchStage()
    }
  }, [dataStage])

  useEffect(() => {
    if(dataJournal){
      setJournals(dataJournal)
    }
    else{
      fetchJournal()
    }
  }, [dataJournal])

  useEffect(() => {
    if(dataSuivi){
      setSuivis(dataSuivi)
    }
    else{
      fetchSuivi()
    }
  }, [dataSuivi])

  useEffect(() => {
    if(dataEvaluation){
      setEvaluations(dataEvaluation)
    }
    else{
      fetchEvaluation()
    }
  }, [dataEvaluation])

  useEffect(() => {
    if (dataStagiaire && dataCand) {
      const filteredInternships = dataStagiaire.filter((dt) => {
        return dataCand.some((dcm) => dcm.candidat === dt.id && dcm.statut.trim() !== "Refuser");
      });
      setStagiaires(filteredInternships);
    } else {
      fetchStagiaire();
      fetchCandidature();
    }
  }, [dataStagiaire, dataCand]);

  const handleExportToExcel = () => {
    // Créer un tableau avec les données à exporter
    const data = stagiaires.map((stage) => {
      const stagiaire = {
        journalEntries: journals.filter((journal) => journal.stagiaire === stage.id),
        ...suivis.findLast((sv) => sv.stagiaire === stage.id),
        status: suivis.findLast((sv) => sv.stagiaire === stage.id)?.statut,
        skills: { ...evaluations.findLast((evl) => evl.stagiaire === stage.id) },
        ...stage,
        id: stage.id
      };

      return {
        "ID": stagiaire.id,
        "Nom": stagiaire.nom,
        "Département": stagiaire.departement,
        "Date de début": stagiaire.dateDebut,
        "Date de fin": stagiaire.dateFin,
        "Superviseur": stagiaire.superviseur,
        "Statut": stagiaire.status,
        "Rapport": stagiaire.rapport || "Non soumis",
      };
    });

    // Créer la feuille de calcul à partir des données
    const ws = XLSX.utils.json_to_sheet(data);

    // Créer un classeur et ajouter la feuille
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Stagiaires");

    // Exporter le fichier Excel
    XLSX.writeFile(wb, "stagiaires_data.xlsx");
  };

const skills=["Performance globale","Compétences techniques","Communication","Travail d'équipe","Ponctualité"]
  
  const styles = {
    container: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      padding: isMobile ? "15px 20px" : "20px 25px",
      borderBottom: "1px solid var(--border-color)",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "0",
    },
    title: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      margin: 0,
    },
    actions: {
      display: "flex",
      gap: "10px",
      width: isMobile ? "100%" : "auto",
      flexDirection: isMobile ? "column" : "row",
    },
    searchContainer: {
      position: "relative",
      width: isMobile ? "100%" : "250px",
    },
    searchInput: {
      width: "100%",
      padding: "8px 16px 8px 40px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      outline: "none",
    },
    searchIcon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
    },
    exportButton: {
      backgroundColor: "white",
      color: "var(--text-dark)",
      border: "1px solid var(--border-color)",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      gap: "8px",
      width: isMobile ? "100%" : "auto",
      position: "relative",
    },
    exportOptions: {
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "white",
      border: "1px solid var(--border-color)",
      borderRadius: "6px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      marginTop: "5px",
      width: "150px",
    },
    exportOption: {
      padding: "8px 15px",
      cursor: "pointer",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "background-color 0.2s",
    },
    backButton: {
      backgroundColor: "white",
      color: "var(--text-dark)",
      border: "1px solid var(--border-color)",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      gap: "8px",
      width: isMobile ? "100%" : "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "var(--primary-light)",
      padding: isMobile ? "10px 15px" : "15px 20px",
      textAlign: "left",
      fontWeight: 600,
      color: "var(--primary-dark)",
      fontSize: isMobile ? "12px" : "14px",
      whiteSpace: "nowrap",
    },
    td: {
      padding: isMobile ? "10px 15px" : "15px 20px",
      borderBottom: "1px solid var(--border-color)",
      fontSize: isMobile ? "12px" : "14px",
    },
    statusBadge: (status) => {
      let color = "#FFA000"
      let bgColor = "#FFF8E1"

      if (status === "Terminé") {
        color = "#4CAF50"
        bgColor = "#E8F5E9"
      } else if (status === "Terminé prématurément") {
        color = "#F44336"
        bgColor = "#FFEBEE"
      }

      return {
        display: "inline-block",
        padding: isMobile ? "3px 8px" : "5px 10px",
        backgroundColor: bgColor,
        color: color,
        borderRadius: "20px",
        fontSize: isMobile ? "10px" : "12px",
        fontWeight: 500,
      }
    },
    reportStatusBadge: (status) => {
      let color = "#FFA000"
      let bgColor = "#FFF8E1"

      if (status === "Validé") {
        color = "#4CAF50"
        bgColor = "#E8F5E9"
      } else if (status === "Rejeté") {
        color = "#F44336"
        bgColor = "#FFEBEE"
      }

      return {
        display: "inline-block",
        padding: isMobile ? "3px 8px" : "5px 10px",
        backgroundColor: bgColor,
        color: color,
        borderRadius: "20px",
        fontSize: isMobile ? "10px" : "12px",
        fontWeight: 500,
      }
    },
    actionButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "5px",
      borderRadius: "4px",
      color: "#666",
      transition: "background-color 0.2s",
    },
    evaluateButton: {
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-color)",
      border: "none",
      padding: "5px 8px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
    },
    validateButton: {
      backgroundColor: "#E8F5E9",
      color: "#4CAF50",
      border: "none",
      padding: "5px 8px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
    },
    pagination: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      padding: isMobile ? "15px 20px" : "15px 25px",
      borderTop: "1px solid var(--border-color)",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "0",
    },
    pageInfo: {
      fontSize: isMobile ? "12px" : "14px",
      color: "#666",
    },
    pageControls: {
      display: "flex",
      gap: "5px",
    },
    pageButton: {
      width: "32px",
      height: "32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid var(--border-color)",
      borderRadius: "4px",
      backgroundColor: "white",
      cursor: "pointer",
      fontSize: "14px",
    },
    activePageButton: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "1px solid var(--primary-color)",
    },
    detailsContainer: {
      padding: "20px",
    },
    detailsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    detailsTitle: {
      fontSize: "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      margin: 0,
    },
    tabsContainer: {
      display: "flex",
      borderBottom: "1px solid var(--border-color)",
      marginBottom: "20px",
    },
    tab: (isActive) => ({
      padding: "10px 20px",
      cursor: "pointer",
      borderBottom: isActive ? "2px solid var(--primary-color)" : "none",
      color: isActive ? "var(--primary-color)" : "var(--text-dark)",
      fontWeight: isActive ? 600 : 400,
    }),
    infoGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "20px",
      marginBottom: "30px",
    },
    infoCard: {
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      padding: "15px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    infoTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginTop: 0,
      marginBottom: "15px",
    },
    infoRow: {
      display: "flex",
      marginBottom: "10px",
    },
    infoLabel: {
      width: "40%",
      fontWeight: 500,
      color: "#666",
    },
    infoValue: {
      width: "60%",
      color: "var(--text-dark)",
    },
    journalEntries: {
      marginBottom: "30px",
    },
    journalEntry: {
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    entryDate: {
      fontWeight: 600,
      color: "var(--primary-color)",
      marginBottom: "10px",
    },
    entryTitle: {
      fontWeight: 500,
      marginBottom: "10px",
      color: "var(--text-dark)",
    },
    entryDescription: {
      color: "#666",
      marginBottom: "15px",
    },
    adminCommentSection: {
      marginTop: "15px",
      borderTop: "1px dashed #ddd",
      paddingTop: "15px",
    },
    adminCommentTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--primary-color)",
      marginBottom: "10px",
    },
    adminCommentText: {
      color: "#666",
      fontStyle: "italic",
      marginBottom: "15px",
    },
    commentForm: {
      marginTop: "15px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      minHeight: "80px",
      resize: "vertical",
      marginBottom: "10px",
    },
    commentButton: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
    },
    evaluationGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
      gap: "20px",
      marginBottom: "30px",
    },
    evaluationCard: {
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      padding: "15px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    skillName: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginTop: 0,
      marginBottom: "15px",
    },
    ratingContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    ratingLabel: {
      color: "#666",
    },
    ratingValue: {
      fontWeight: 600,
      color: "var(--primary-color)",
    },
    ratingCompare: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "5px",
    },
    ratingBar: {
      height: "8px",
      borderRadius: "4px",
      backgroundColor: "#e0e0e0",
      marginTop: "5px",
      position: "relative",
    },
    ratingBarFill: (width) => ({
      height: "100%",
      borderRadius: "4px",
      backgroundColor: "var(--primary-color)",
      width: `${width * 20}%`,
    }),
    ratingInput: {
      width: "100%",
      marginTop: "10px",
      accentColor: "var(--primary-color)",
    },
    reportPreview: {
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "30px",
    },
    reportHeader: {
      textAlign: "center",
      marginBottom: "30px",
    },
    reportTitle: {
      fontSize: "24px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginBottom: "10px",
    },
    reportSubtitle: {
      fontSize: "16px",
      color: "#666",
      fontWeight: 400,
    },
    reportSection: {
      marginBottom: "20px",
    },
    reportSectionTitle: {
      fontSize: "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginBottom: "15px",
      borderBottom: "1px solid var(--border-color)",
      paddingBottom: "5px",
    },
    reportText: {
      color: "#666",
      lineHeight: "1.6",
    },
    reportTable: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    reportTh: {
      backgroundColor: "#f8f9fa",
      padding: "10px 15px",
      textAlign: "left",
      fontWeight: 600,
      color: "var(--text-dark)",
      border: "1px solid var(--border-color)",
    },
    reportTd: {
      padding: "10px 15px",
      border: "1px solid var(--border-color)",
      color: "#666",
    },
    reportActions: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "30px",
    },
    validateReportButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
    },
    rejectReportButton: {
      backgroundColor: "#F44336",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
    },
    feedbackForm: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    feedbackTextarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      minHeight: "100px",
      resize: "vertical",
      marginBottom: "15px",
    },
    feedbackLabel: {
      fontSize: "14px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginBottom: "10px",
      display: "block",
    },
    adminFeedbackSection: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#FFEBEE",
      borderRadius: "8px",
      borderLeft: "4px solid #F44336",
    },
    adminFeedbackTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#D32F2F",
      marginBottom: "10px",
    },
    adminFeedbackText: {
      color: "#666",
      lineHeight: "1.6",
    },
    responsiveTable: {
      overflowX: "auto",
    },
    mobileCard: {
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "10px",
      backgroundColor: "white",
    },
    mobileCardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    mobileCardTitle: {
      fontWeight: 600,
      fontSize: "14px",
    },
    mobileCardStatus: {
      display: "inline-block",
    },
    mobileCardContent: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    mobileCardItem: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "13px",
    },
    mobileCardLabel: {
      color: "#666",
    },
    mobileCardValue: {
      fontWeight: 500,
    },
    mobileCardActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "15px",
    },
  }

  // Rendu mobile pour la liste des stagiaires
  const renderMobileStagiairesList = () => {
    return (
      <div style={{ padding: "10px" }}>
        {paginatedStagiaires.map((stagiaire, index) => (
          <div key={index} style={styles.mobileCard}>
            <div style={styles.mobileCardHeader}>
              <div style={styles.mobileCardTitle}>{stagiaire.name}</div>
              <div style={styles.mobileCardStatus}>
                <span style={styles.statusBadge(stagiaire.status)}>{stagiaire.status}</span>
              </div>
            </div>
            <div style={styles.mobileCardContent}>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>ID:</div>
                <div style={styles.mobileCardValue}>{stagiaire.id}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Département:</div>
                <div style={styles.mobileCardValue}>{stagiaire.department}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Période:</div>
                <div style={styles.mobileCardValue}>
                  {stagiaire.startDate} - {stagiaire.endDate}
                </div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Superviseur:</div>
                <div style={styles.mobileCardValue}>{stagiaire.supervisor}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Email:</div>
                <div style={styles.mobileCardValue}>{stagiaire.email}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Rapport:</div>
                <div style={styles.mobileCardValue}>
                  <span style={styles.reportStatusBadge(stagiaire.reportStatus)}>{stagiaire.reportStatus}</span>
                </div>
              </div>
            </div>
            <div style={styles.mobileCardActions}>
              <button
                title="Voir les détails"
                style={styles.actionButton}
                onClick={() => handleViewDetails(stagiaire.id)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                👁️
              </button>
              {stagiaire.reportStatus === "En attente de validation" && (
                <button
                  title="Valider le rapport"
                  style={styles.validateButton}
                  onClick={() => handleValidateReport(stagiaire.id)}
                  onMouseOver={(e) => (
                    (e.currentTarget.style.backgroundColor = "#4CAF50"), (e.currentTarget.style.color = "white")
                  )}
                  onMouseOut={(e) => (
                    (e.currentTarget.style.backgroundColor = "#E8F5E9"), (e.currentTarget.style.color = "#4CAF50")
                  )}
                >
                  ✓ Valider
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={styles.container}>
      {activeTab === "liste" ? (
        <>
          <div style={styles.header}>
            <h2 style={styles.title}>Suivi des Stagiaires</h2>
            <div style={styles.actions}>
              <div style={styles.searchContainer}>
                <span style={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Rechercher un stagiaire..."
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div style={{ position: "relative" }}>
                <button
                  style={styles.exportButton}
                  onClick={() => handleExportToExcel()}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                >
                  📥 Exporter
                </button>
                {/* {showExportOptions && (
                  <div style={styles.exportOptions}>
                    <div
                      style={styles.exportOption}
                      onClick={() => handleExport("PDF")}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                    >
                      📄 PDF
                    </div>
                    <div
                      style={styles.exportOption}
                      onClick={() => handleExport("Excel")}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                    >
                      📊 Excel
                    </div>
                    <div
                      style={styles.exportOption}
                      onClick={() => handleExport("CSV")}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                    >
                      📋 CSV
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          {isMobile ? (
            renderMobileStagiairesList()
          ) : (
            <div style={styles.responsiveTable}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Nom</th>
                    <th style={styles.th}>Département</th>
                    <th style={styles.th}>Date de début</th>
                    <th style={styles.th}>Date de fin</th>
                    <th style={styles.th}>Superviseur</th>
                    <th style={styles.th}>Statut</th>
                    <th style={styles.th}>Rapport</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStagiaires.map((stage, index) => {
                    //const stages.filter((stg)=>stg.)
                      const stagiaire = {
                        journalEntries: journals.filter((journal)=> journal.stagiaire == stage.id),
                        ...suivis.findLast((sv)=>sv.stagiaire == stage.id),
                        status : suivis.findLast((sv)=>sv.stagiaire == stage.id)?.statut,
                        skills: {...evaluations.findLast((evl)=>evl.stagiaire == stage.id)},
                        ...stage,
                        id: stage.id
                      }
                      console.log(stagiaire)
                    return (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--hover-color)" }}>
                      <td style={styles.td}>{stagiaire.id}</td>
                      <td style={styles.td}>{stagiaire.nom}</td>
                      <td style={styles.td}>{stagiaire.departement}</td>
                      <td style={styles.td}>{stagiaire.dateDebut}</td>
                      <td style={styles.td}>{stagiaire.dateFin}</td>
                      <td style={styles.td}>{stagiaire.superviseur}</td>
                      <td style={styles.td}>
                        <span style={styles.statusBadge(stagiaire.status)}>{stagiaire.status}</span>
                      </td>
                      <td style={styles.td}>
                        <span style={styles.reportStatusBadge(stagiaire.rapport)}>{stagiaire.rapport}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <button
                            title="Voir les détails"
                            style={styles.actionButton}
                            onClick={() => handleViewDetails(stagiaire.id)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            👁️
                          </button>
                          {stagiaire.reportStatus === "En attente de validation" && (
                            <button
                              title="Valider le rapport"
                              style={styles.validateButton}
                              onClick={() => handleValidateReport(stagiaire.id)}
                              onMouseOver={(e) => (
                                (e.currentTarget.style.backgroundColor = "#4CAF50"),
                                (e.currentTarget.style.color = "white")
                              )}
                              onMouseOut={(e) => (
                                (e.currentTarget.style.backgroundColor = "#E8F5E9"),
                                (e.currentTarget.style.color = "#4CAF50")
                              )}
                            >
                              ✓ Valider
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}

          {filteredStagiaires.length > 0 && (
            <div style={styles.pagination}>
              <div style={styles.pageInfo}>
                Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
                {Math.min(currentPage * itemsPerPage, filteredStagiaires.length)} sur {filteredStagiaires.length}{" "}
                entrées
              </div>
              <div style={styles.pageControls}>
                <button style={styles.pageButton} onClick={goToPreviousPage} disabled={currentPage === 1}>
                  ⬅️
                </button>
                <button style={{ ...styles.pageButton, ...styles.activePageButton }}>{currentPage}</button>
                <button style={styles.pageButton} onClick={goToNextPage} disabled={currentPage === totalPages}>
                  ➡️
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={styles.detailsContainer}>
          <div style={styles.detailsHeader}>
            <h2 style={styles.detailsTitle}>Suivi du stagiaire: {selectedStagiaire.nom}</h2>
            <button
              style={styles.backButton}
              onClick={() => setActiveTab("liste")}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              ← Retour à la liste
            </button>
          </div>

          <div style={styles.tabsContainer}>
            <div style={styles.tab(detailsTab === "journal")} onClick={() => setDetailsTab("journal")}>
              Journal de bord 
            </div>
            {Object.keys(selectedStagiaire.skills).length> 0 && (
              <div style={styles.tab(detailsTab === "evaluation")} onClick={() => setDetailsTab("evaluation")}>
                Auto-évaluation
              </div>
            )}
            {Object.keys(selectedStagiaire.skills).length > 0 && (
              <div style={styles.tab(detailsTab === "info")} onClick={() => setDetailsTab("info")}>
              Informations
            </div>
            )}
            
            {Object.keys(selectedStagiaire.skills).length > 0 && (
                <div style={styles.tab(detailsTab === "rapport")} onClick={() => setDetailsTab("rapport")}>
                Rapport final
              </div>
            )}

          </div>

          {detailsTab === "journal" && (
            <div style={styles.journalEntries}>
              <h3 style={styles.infoTitle}>Journal de bord</h3>

              {selectedStagiaire.journalEntries.length === 0 ? (
                <p>Aucune entrée dans le journal de bord.</p>
              ) : (
                selectedStagiaire.journalEntries.map((entry) => (
                  <div key={entry.id} style={styles.journalEntry}>
                    <div style={styles.entryDate}>
                      {new Date(entry.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div style={styles.entryTitle}>{entry.title}</div>
                    <div style={styles.entryDescription}>{entry.description}</div>

                    {entry.adminComment ? (
                      <div style={styles.adminCommentSection}>
                        <div style={styles.adminCommentTitle}>Commentaire de l'administrateur:</div>
                        <div style={styles.adminCommentText}>{entry.adminComment}</div>
                      </div>
                    ) : null}

                    <div style={styles.commentForm}>
                      <textarea
                        style={styles.textarea}
                        placeholder="Ajouter un commentaire..."
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                      />
                      <button
                        style={styles.commentButton}
                        onClick={() => handleAddJournalComment(entry.id)}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
                      >
                        Ajouter un commentaire
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {detailsTab === "evaluation" && (
            <div>
              <h3 style={styles.infoTitle}>Évaluation des compétences</h3>
              <p>Comparaison entre l'auto-évaluation du stagiaire et votre évaluation</p>

              <div style={styles.evaluationGrid}>
                {skills.map((skill, key) => {
                  let skl = null;
                  let skl_auto=null;
                  let skl_name = null;
                  if(key==0){
                    skl = selectedStagiaire.skills.performance
                    skl_auto = selectedStagiaire.skills.auto_performance
                    skl_name="performance"
                  }else if(key==1){
                    skl = selectedStagiaire.skills.competencesTechniques
                    skl_auto = selectedStagiaire.skills.auto_competencesTechniques
                    skl_name = "competencesTechniques"
                  }else if(key==2){
                    skl = selectedStagiaire.skills.communication
                    skl_auto = selectedStagiaire.skills.auto_communication
                    skl_name = "communication"
                  }else if(key==3){
                    skl = selectedStagiaire.skills.travailEquipe
                    skl_auto = selectedStagiaire.skills.auto_travailEquipe
                    skl_name = "travailEquipe"
                  } else if(key==4){
                    skl = selectedStagiaire.skills.ponctualite
                    skl_auto = selectedStagiaire.skills.auto_ponctualite
                    skl_name = "ponctualite"
                  }

                  
                  return (
                  <div key={key} style={styles.evaluationCard}>
                    <h4 style={styles.skillName}>{skill}</h4>

                    <div style={styles.ratingCompare}>
                      <div style={styles.ratingLabel}>Auto-évaluation du stagiaire:</div>
                      <div style={styles.ratingValue}>{skl_auto}/5</div>
                    </div>
                    <div style={styles.ratingBar}>
                      <div style={styles.ratingBarFill(skl_auto)}></div>
                    </div>

                    <div style={{ ...styles.ratingCompare, marginTop: "15px" }}>
                      <div style={styles.ratingLabel}>Votre évaluation:</div>
                      <div style={styles.ratingValue}>{skl}/5</div>
                    </div>
                    <div style={styles.ratingBar}>
                      <div style={styles.ratingBarFill(skl)}></div>
                    </div>

                    <div style={{ marginTop: "15px" }}>
                      <div style={styles.ratingLabel}>Modifier l'évaluation:</div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={skill.adminRating}
                        onChange={(e) => handleAdminRatingChange(skl_name, e.target.value)}
                        style={styles.ratingInput}
                      />
                    </div>
                  </div>
                )})}
              </div>
            </div>
          )}

          {detailsTab === "info" && (
            <div>
              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <h3 style={styles.infoTitle}>Informations personnelles</h3>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Nom:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.nom}</div>
                  </div>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Email:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.email}</div>
                  </div>
                  {/* <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Téléphone:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.phone}</div>
                  </div> */}
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Statut:</div>
                    <div style={styles.infoValue}>
                      <span style={styles.statusBadge(selectedStagiaire.status)}>{selectedStagiaire.status}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.infoCard}>
                  <h3 style={styles.infoTitle}>Informations du stage</h3>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Département:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.departement}</div>
                  </div>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Date de début:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.dateDebut}</div>
                  </div>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Date de fin:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.dateFin}</div>
                  </div>
                  <div style={styles.infoRow}>
                    <div style={styles.infoLabel}>Superviseur:</div>
                    <div style={styles.infoValue}>{selectedStagiaire.superviseur}</div>
                  </div>
                </div>
              </div>

              <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Missions</h3>
                <p style={styles.reportText}>{selectedStagiaire.mission}</p>
              </div>
            </div>
          )}

          {detailsTab === "rapport" && (
            <div>
              <h3 style={styles.infoTitle}>Rapport final</h3>
              <div style={styles.reportStatusBadge(selectedStagiaire.rapport)}>
                Statut: {selectedStagiaire.reportStatus}
              </div>

              {selectedStagiaire.adminFeedback && (
                <div style={styles.adminFeedbackSection}>
                  <div style={styles.adminFeedbackTitle}>Feedback administrateur:</div>
                  <div style={styles.adminFeedbackText}>{selectedStagiaire.description}</div>
                </div>
              )}

              <div style={styles.reportPreview}>
                <div style={styles.reportHeader}>
                  <div style={styles.reportTitle}>RAPPORT DE STAGE</div>
                  <div style={styles.reportSubtitle}>Caisse d'Epargne de Madagascar</div>
                  <div style={styles.reportSubtitle}>
                    Du {selectedStagiaire.dateDebut} au {selectedStagiaire.dateFin}
                  </div>
                </div>

                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>Informations générales</div>
                  <div style={styles.reportText}>
                    <strong>Stagiaire:</strong> {selectedStagiaire.nom}
                    <br />
                    <strong>Entreprise:</strong>Caisse d'Epargne de Madagascar
                    <br />
                    <strong>Maître de stage:</strong> {selectedStagiaire.superviseur}
                    <br />
                    <strong>Période:</strong> Du {selectedStagiaire.dateDebut} au {selectedStagiaire.dateFin}
                  </div>
                </div>

                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>Missions réalisées</div>
                  <div style={styles.reportText}>{selectedStagiaire?.mission}</div>
                </div>

                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>Compétences développées</div>
                  <table style={styles.reportTable}>
                    <thead>
                      <tr>
                        <th style={styles.reportTh}>Compétence</th>
                        <th style={styles.reportTh}>Auto-évaluation</th>
                        <th style={styles.reportTh}>Évaluation admin</th>
                      </tr>
                    </thead>
                    <tbody>
                    {skills.map((skill, key) => {
                        let skl = null;
                        let skl_auto=null;
                        let skl_name = null;
                        if(key==0){
                          skl = selectedStagiaire.skills.performance
                          skl_auto = selectedStagiaire.skills.auto_performance
                          skl_name="performance"
                        }else if(key==1){
                          skl = selectedStagiaire.skills.competencesTechniques
                          skl_auto = selectedStagiaire.skills.auto_competencesTechniques
                          skl_name = "competencesTechniques"
                        }else if(key==2){
                          skl = selectedStagiaire.skills.communication
                          skl_auto = selectedStagiaire.skills.auto_communication
                          skl_name = "communication"
                        }else if(key==3){
                          skl = selectedStagiaire.skills.travailEquipe
                          skl_auto = selectedStagiaire.skills.auto_travailEquipe
                          skl_name = "travailEquipe"
                        } else if(key==4){
                          skl = selectedStagiaire.skills.ponctualite
                          skl_auto = selectedStagiaire.skills.auto_ponctualite
                          skl_name = "ponctualite"
                        }
                       return (<tr key={skill.id}>
                          <td style={styles.reportTd}>{skill}</td>
                          <td style={styles.reportTd}>{skl_auto}/5</td>
                          <td style={styles.reportTd}>{skl}/5</td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>

                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>Journal de bord - Activités principales</div>
                  {selectedStagiaire.journalEntries.length === 0 ? (
                    <div style={styles.reportText}>Aucune entrée n'a été enregistrée dans le journal de bord.</div>
                  ) : (
                    <ul>
                      {selectedStagiaire.journalEntries.map((entry) => (
                        <li key={entry.id} style={styles.reportText}>
                          <strong>{new Date(entry.date).toLocaleDateString("fr-FR")}:</strong> {entry.titre}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {selectedStagiaire.reportStatus === "En attente de validation" && (
                <>
                  <div style={styles.reportActions}>
                    <button
                      style={styles.validateReportButton}
                      onClick={() => handleValidateReport(selectedStagiaire.id)}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#388E3C")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
                    >
                      Valider le rapport
                    </button>
                    <button
                      style={styles.rejectReportButton}
                      onClick={() => {
                        const feedback = prompt("Veuillez saisir votre feedback pour le rejet:")
                        if (feedback) {
                          handleRejectReport(selectedStagiaire.id, feedback)
                        }
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#D32F2F")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F44336")}
                    >
                      Rejeter le rapport
                    </button>
                  </div>

                  <div style={styles.feedbackForm}>
                    <label style={styles.feedbackLabel}>Feedback (optionnel):</label>
                    <textarea
                      style={styles.feedbackTextarea}
                      placeholder="Saisissez votre feedback pour le stagiaire..."
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SuiviStagiaire

