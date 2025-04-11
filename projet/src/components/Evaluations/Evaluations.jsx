"use client"

import { useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import useCreateEvaluation from "../../hooks/useCreateEvaluation"
import { useEffect } from "react"
import useFetchEvaluation from "../../hooks/useFetchEvaluation"
import useUpdateEvaluation from "../../hooks/useUpdateEvaluation"
import useDeleteEvaluation from "../../hooks/useDeleteEvaluation"
import useFetchStagiaire from "../../hooks/useFetchStagiaire"
import useFetchSuivi from "../../hooks/useFetchSuivi"

function Evaluations() {
  const [evaluations, setEvaluations] = useState([
    /*{
      id: "EV-2023-001",
      stagiaire: "Rakoto Jean",
      departement: "Informatique",
      superviseur: "Randria Marc",
      dateEvaluation: "15/07/2023",
      performance: 4,
      competencesTechniques: 5,
      communication: 4,
      travailEquipe: 4,
      ponctualite: 5,
      commentaires: "Excellent stagiaire, très motivé et compétent. A fait preuve d'une grande autonomie.",
      recommandation: "Très fortement recommandé",
    },
    {
      id: "EV-2023-002",
      stagiaire: "Ranaivo Sophie",
      departement: "Finance",
      superviseur: "Razafy Hery",
      dateEvaluation: "01/08/2023",
      performance: 3,
      competencesTechniques: 3,
      communication: 4,
      travailEquipe: 5,
      ponctualite: 4,
      commentaires:
        "Bonne stagiaire, s'est bien intégrée à l'équipe. Quelques difficultés techniques au début mais a progressé.",
      recommandation: "Recommandé",
    },
    {
      id: "EV-2023-003",
      stagiaire: "Andria Michel",
      departement: "Marketing",
      superviseur: "Rakotondrabe Luc",
      dateEvaluation: "15/05/2023",
      performance: 2,
      competencesTechniques: 2,
      communication: 3,
      travailEquipe: 2,
      ponctualite: 2,
      commentaires: "Stagiaire peu motivé, souvent en retard. Compétences techniques insuffisantes.",
      recommandation: "Non recommandé",
    },
    {
      id: "EV-2023-004",
      stagiaire: "Razafindrakoto Aina",
      departement: "Ressources Humaines",
      superviseur: "Rasoamanarivo Voahangy",
      dateEvaluation: "31/08/2023",
      performance: 5,
      competencesTechniques: 4,
      communication: 5,
      travailEquipe: 5,
      ponctualite: 5,
      commentaires: "Stagiaire exceptionnelle, très professionnelle et efficace. A apporté plusieurs idées innovantes.",
      recommandation: "Très fortement recommandé",
    },
    {
      id: "EV-2023-005",
      stagiaire: "Rabemananjara Paul",
      departement: "Comptabilité",
      superviseur: "Rakotoarisoa Mamy",
      dateEvaluation: "15/06/2023",
      performance: 4,
      competencesTechniques: 4,
      communication: 3,
      travailEquipe: 3,
      ponctualite: 4,
      commentaires: "Bon stagiaire, rigoureux et méthodique. Pourrait améliorer sa communication.",
      recommandation: "Recommandé",
    },
  */])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [stagiaires, setStagiaires] = useState([])
  const [suivis, setSuivis] = useState([])
  const [filterDepartement, setFilterDepartement] = useState("tous")
  const {createEvaluation, data: dataEval} = useCreateEvaluation()
  const {fetchEvaluation, data} = useFetchEvaluation()
  const {fetchSuivi, data: dataSuivi} = useFetchSuivi()
  const {updateEvaluation}=useUpdateEvaluation()
  const {deleteEvaluation} = useDeleteEvaluation()
  const {fetchStagiaire, data: dataStagiaire} = useFetchStagiaire()

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")

  const [newEvaluation, setNewEvaluation] = useState({
    stagiaire: "",
    departement: "",
    superviseur: "",
    dateEvaluation: new Date().toLocaleDateString("fr-FR"),
    performance: 3,
    competencesTechniques: 3,
    communication: 3,
    travailEquipe: 3,
    ponctualite: 3,
    commentaires: "",
    recommandation: "Recommandé",
  })

  const departements = [
    "Informatique",
    "Finance",
    "Marketing",
    "Ressources Humaines",
    "Comptabilité",
    "Service Client",
    "Direction",
  ]

  const recommandations = [
    "Très fortement recommandé",
    "Fortement recommandé",
    "Recommandé",
    "Recommandé avec réserves",
    "Non recommandé",
  ]

  // Filtrer les évaluations en fonction de la recherche et du département
  const filteredEvaluations = evaluations.filter(
    (evaluation) =>
      (stagiaires.find((stg)=> stg.id ==  evaluation.stagiaire)?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.superviseur.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDepartement === "tous" || evaluation.departement === filterDepartement),
  )

  const handleAddEvaluation = () => {
    newEvaluation.dateEvaluation = newEvaluation.dateEvaluation ? new Date().toLocaleDateString("fr-FR") : newEvaluation.dateEvaluation
    newEvaluation.superviseur = suivis.find((stg)=> stg.id ==  newEvaluation.stagiaire)?.superviseur

    const newEvaluationWithId = {
      ...newEvaluation,
      id: evaluations[evaluations.length-1]?.id + 1 || 1,
      date : newEvaluation.dateEvaluation.split("/").length==3 ? (newEvaluation.dateEvaluation.split("/")[2]+"-"+newEvaluation.dateEvaluation.split("/")[1]+"-"+newEvaluation.dateEvaluation.split("/")[0]) : newEvaluation.dateEvaluation
    }
    createEvaluation(newEvaluationWithId)

    setEvaluations([...evaluations, newEvaluationWithId])
    setShowAddModal(false)
    setNewEvaluation({
      stagiaire: "",
      departement: "",
      superviseur: "",
      dateEvaluation: new Date().toLocaleDateString("fr-FR"),
      performance: 3,
      competencesTechniques: 3,
      communication: 3,
      travailEquipe: 3,
      ponctualite: 3,
      commentaires: "",
      recommandation: "Recommandé",
    })
  }

  useEffect(() => {
    if(dataStagiaire){
      setStagiaires(dataStagiaire)
    }else{
      fetchStagiaire()
    }
  }, [dataStagiaire])

  useEffect(() => {
    if(dataSuivi){
      setSuivis(dataSuivi)
    } else {
      fetchSuivi()
    }
  }, [dataSuivi])

  const handleEditEvaluation = () => {
    if (!currentEvaluation) return

    const updatedEvaluations = evaluations.map((evaluation) =>
      evaluation.id === currentEvaluation.id ? currentEvaluation : evaluation,
      
      )
    updateEvaluation(currentEvaluation)
    setEvaluations(updatedEvaluations)
    setShowEditModal(false)
    setCurrentEvaluation(null)
  }

  const handleDeleteEvaluation = () => {
    if (!currentEvaluation) return

    const updatedEvaluations = evaluations.filter((evaluation) => evaluation.id !== currentEvaluation.id)
    deleteEvaluation(currentEvaluation.id)
    setEvaluations(updatedEvaluations)
    setShowDeleteModal(false)
    setCurrentEvaluation(null)
  }

  useEffect(() => {
    if(data){
      setEvaluations(data)
    }else{
      fetchEvaluation()
    }
  }, [data])
  

  const handleInputChange = (e, isNewEvaluation = true) => {
    const { name, value } = e.target

    if (isNewEvaluation) {
      setNewEvaluation((prev) => ({
        ...prev,
        [name]: value,
      }))
      if(name == "stagiaire"){
        setNewEvaluation((prev) => ({
          ...prev,
          [name]: value,
          superviseur: suivis.find((stg)=> stg.id ==  value)?.superviseur
        }))
      }
    } else {
      setCurrentEvaluation((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Fonction pour calculer la note moyenne
  const calculateAverage = (evaluation) => {
    const scores = [
      evaluation.performance,
      evaluation.competencesTechniques,
      evaluation.communication,
      evaluation.travailEquipe,
      evaluation.ponctualite,
    ]
    return scores.reduce((a, b) => a + b, 0) / scores.length
  }

  // Fonction pour obtenir la couleur en fonction de la note
  const getScoreColor = (score) => {
    if (score >= 4.5) return "#4CAF50" // Vert
    if (score >= 3.5) return "#8BC34A" // Vert clair
    if (score >= 2.5) return "#FFC107" // Jaune
    if (score >= 1.5) return "#FF9800" // Orange
    return "#F44336" // Rouge
  }

  const styles = {
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      padding: isMobile ? "15px 20px" : "20px 25px",
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "0",
    },
    title: {
      fontSize: isMobile ? "18px" : "24px",
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
    addButton: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "none",
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
    filterContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: isMobile ? "100%" : "auto",
    },
    filterLabel: {
      fontSize: "14px",
      color: "#666",
      whiteSpace: "nowrap",
    },
    filterSelect: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
      width: isMobile ? "100%" : "auto",
    },
    content: {
      flex: 1,
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    tableContainer: {
      flex: 1,
      overflowX: "auto",
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
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    td: {
      padding: isMobile ? "10px 15px" : "15px 20px",
      borderBottom: "1px solid var(--border-color)",
      fontSize: isMobile ? "12px" : "14px",
    },
    scoreCell: (score) => ({
      padding: isMobile ? "10px 15px" : "15px 20px",
      borderBottom: "1px solid var(--border-color)",
      fontSize: isMobile ? "12px" : "14px",
      color: getScoreColor(score),
      fontWeight: 600,
    }),
    actionButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "5px",
      borderRadius: "4px",
      color: "#666",
      transition: "background-color 0.2s",
      marginRight: "5px",
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
    // Styles pour les modals
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: isMobile ? "15px" : "0",
    },
    modal: {
      backgroundColor: "white",
      borderRadius: "10px",
      width: isMobile ? "100%" : "600px",
      maxWidth: "90%",
      maxHeight: "90vh",
      overflow: "auto",
      boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
    },
    modalHeader: {
      padding: isMobile ? "15px 20px" : "20px 25px",
      borderBottom: "1px solid var(--border-color)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      margin: 0,
    },
    closeButton: {
      backgroundColor: "transparent",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      color: "#666",
    },
    modalBody: {
      padding: isMobile ? "15px 20px" : "20px 25px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    formRow: {
      display: "flex",
      gap: "20px",
      flexDirection: isMobile ? "column" : "row",
    },
    formColumn: {
      flex: 1,
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
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      outline: "none",
      minHeight: "100px",
      resize: "vertical",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
    },
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    ratingLabel: {
      fontSize: "14px",
      fontWeight: 500,
      color: "var(--text-dark)",
      width: "150px",
    },
    ratingStars: {
      display: "flex",
      gap: "5px",
    },
    ratingStar: (filled) => ({
      cursor: "pointer",
      color: filled ? "#FFC107" : "#E0E0E0",
      fontSize: "24px",
    }),
    modalFooter: {
      padding: isMobile ? "15px 20px" : "15px 25px",
      borderTop: "1px solid var(--border-color)",
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      flexDirection: isMobile ? "column" : "row",
    },
    cancelButton: {
      backgroundColor: "white",
      color: "var(--text-dark)",
      border: "1px solid var(--border-color)",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
    },
    confirmButton: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
    },
    deleteButton: {
      backgroundColor: "var(--secondary-color)",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
    },
    deleteModalBody: {
      padding: isMobile ? "20px" : "25px",
      textAlign: "center",
    },
    deleteIcon: {
      fontSize: "48px",
      color: "var(--secondary-color)",
      marginBottom: "20px",
    },
    deleteText: {
      fontSize: isMobile ? "14px" : "16px",
      marginBottom: "20px",
      color: "var(--text-dark)",
    },
    evaluationHighlight: {
      fontWeight: 600,
    },
    viewModalSection: {
      marginBottom: "20px",
    },
    viewModalSectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--primary-color)",
      marginBottom: "10px",
      paddingBottom: "5px",
      borderBottom: "1px solid var(--primary-light)",
    },
    viewModalRow: {
      display: "flex",
      marginBottom: "10px",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "5px" : "0",
    },
    viewModalLabel: {
      fontWeight: 500,
      width: isMobile ? "auto" : "200px",
      color: "#666",
    },
    viewModalValue: {
      flex: 1,
    },
    viewModalRating: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    viewModalRatingValue: (score) => ({
      fontWeight: 600,
      color: getScoreColor(score),
    }),
    viewModalRatingStars: (score) => ({
      display: "flex",
      gap: "2px",
      color: getScoreColor(score),
    }),
    viewModalAverage: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "var(--primary-light)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    viewModalAverageLabel: {
      fontWeight: 600,
      color: "var(--primary-dark)",
    },
    viewModalAverageValue: (score) => ({
      fontWeight: 700,
      fontSize: "18px",
      color: getScoreColor(score),
    }),
    // Styles pour l'affichage mobile en cartes
    cardsContainer: {
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      overflow: "auto",
      flex: 1,
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      border: "1px solid var(--border-color)",
      padding: "15px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "15px",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginBottom: "5px",
    },
    cardDepartment: {
      fontSize: "14px",
      color: "var(--primary-color)",
      marginBottom: "5px",
    },
    cardSupervisor: {
      fontSize: "14px",
      color: "#666",
    },
    cardScore: (score) => ({
      fontSize: "18px",
      fontWeight: 700,
      color: getScoreColor(score),
      display: "flex",
      alignItems: "center",
      gap: "5px",
    }),
    cardContent: {
      marginBottom: "15px",
    },
    cardSection: {
      marginBottom: "10px",
    },
    cardSectionTitle: {
      fontSize: "14px",
      fontWeight: 600,
      color: "#666",
      marginBottom: "5px",
    },
    cardText: {
      fontSize: "14px",
      color: "var(--text-dark)",
      lineHeight: 1.4,
    },
    cardFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "15px",
      borderTop: "1px solid var(--border-color)",
      paddingTop: "15px",
    },
    cardButton: {
      backgroundColor: "transparent",
      border: "1px solid var(--border-color)",
      borderRadius: "6px",
      padding: "6px 12px",
      fontSize: "13px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    viewButton: {
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-color)",
      border: "1px solid var(--primary-color)",
    },
    editButton: {
      backgroundColor: "#E3F2FD",
      color: "#1976D2",
      border: "1px solid #1976D2",
    },
    deleteCardButton: {
      backgroundColor: "#FFEBEE",
      color: "var(--secondary-color)",
      border: "1px solid var(--secondary-color)",
    },
  }

  // Composant pour afficher les étoiles de notation
  const RatingStars = ({ rating, onChange, readOnly = false }) => {
    return (
      <div style={styles.ratingStars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={styles.ratingStar(star <= rating)}
            onClick={() => !readOnly && onChange && onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  // Rendu des cartes pour mobile
  const renderCards = () => {
    return (
      <div style={styles.cardsContainer}>
        {filteredEvaluations.map((evaluation) => {
          const averageScore = calculateAverage(evaluation)
          return (
            <div key={evaluation.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={styles.cardTitle}>{evaluation.stagiaire}</div>
                  <div style={styles.cardDepartment}>{evaluation.departement}</div>
                  <div style={styles.cardSupervisor}>Superviseur: {evaluation.superviseur}</div>
                </div>
                <div style={styles.cardScore(averageScore)}>
                  {averageScore.toFixed(1)} <span>★</span>
                </div>
              </div>

              <div style={styles.cardContent}>
                <div style={styles.cardSection}>
                  <div style={styles.cardSectionTitle}>Date d'évaluation</div>
                  <div style={styles.cardText}>{evaluation.dateEvaluation}</div>
                </div>

                <div style={styles.cardSection}>
                  <div style={styles.cardSectionTitle}>Recommandation</div>
                  <div style={styles.cardText}>{evaluation.recommandation}</div>
                </div>
              </div>

              <div style={styles.cardFooter}>
                <button
                  style={{ ...styles.cardButton, ...styles.viewButton }}
                  onClick={() => {
                    setCurrentEvaluation(evaluation)
                    setShowViewModal(true)
                  }}
                >
                  👁️ Voir
                </button>
                <button
                  style={{ ...styles.cardButton, ...styles.editButton }}
                  onClick={() => {
                    setCurrentEvaluation(evaluation)
                    setShowEditModal(true)
                  }}
                >
                  ✏️ Modifier
                </button>
                <button
                  style={{ ...styles.cardButton, ...styles.deleteCardButton }}
                  onClick={() => {
                    setCurrentEvaluation(evaluation)
                    setShowDeleteModal(true)
                  }}
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Évaluations des Stagiaires</h1>
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
          <div style={styles.filterContainer}>
            <span style={styles.filterLabel}>Département:</span>
            <select
              style={styles.filterSelect}
              value={filterDepartement}
              onChange={(e) => setFilterDepartement(e.target.value)}
            >
              <option value="tous">Tous</option>
              {departements.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
          >
            + Ajouter une évaluation
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {isMobile ? (
          renderCards()
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Stagiaire</th>
                  <th style={styles.th}>Département</th>
                  <th style={styles.th}>Superviseur</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Note moyenne</th>
                  <th style={styles.th}>Recommandation</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvaluations.map((evaluation, index) => {
                  const averageScore = calculateAverage(evaluation)
                  return (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--hover-color)" }}>
                      <td style={styles.td}>{evaluation.id}</td>
                      <td style={styles.td}>{stagiaires.find((stg)=> stg.id ==  evaluation.stagiaire)?.nom}</td>
                      <td style={styles.td}>{evaluation.departement}</td>
                      <td style={styles.td}>{evaluation.superviseur}</td>
                      <td style={styles.td}>{evaluation.dateEvaluation}</td>
                      <td style={styles.scoreCell(averageScore)}>
                        {averageScore.toFixed(1)} <span>★</span>
                      </td>
                      <td style={styles.td}>{evaluation.recommandation}</td>
                      <td style={styles.td}>
                        <div style={{ display: "flex" }}>
                          <button
                            title="Voir"
                            style={styles.actionButton}
                            onClick={() => {
                              setCurrentEvaluation(evaluation)
                              setShowViewModal(true)
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            👁️
                          </button>
                          <button
                            title="Modifier"
                            style={styles.actionButton}
                            onClick={() => {
                              setCurrentEvaluation(evaluation)
                              setShowEditModal(true)
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            ✏️
                          </button>
                          <button
                            title="Supprimer"
                            style={styles.actionButton}
                            onClick={() => {
                              setCurrentEvaluation(evaluation)
                              setShowDeleteModal(true)
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div style={styles.pagination}>
          <div style={styles.pageInfo}>
            Affichage de 1 à {filteredEvaluations.length} sur {filteredEvaluations.length} entrées
          </div>
          <div style={styles.pageControls}>
            <button style={styles.pageButton}>⬅️</button>
            <button style={{ ...styles.pageButton, ...styles.activePageButton }}>1</button>
            <button style={styles.pageButton}>➡️</button>
          </div>
        </div>
      </div>

      {/* Modal d'ajout d'évaluation */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Ajouter une évaluation</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowAddModal(false)
                  setNewEvaluation({
                    stagiaire: "",
                    departement: "",
                    superviseur: "",
                    dateEvaluation: new Date().toLocaleDateString("fr-FR"),
                    performance: 3,
                    competencesTechniques: 3,
                    communication: 3,
                    travailEquipe: 3,
                    ponctualite: 3,
                    commentaires: "",
                    recommandation: "Recommandé",
                  })
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="stagiaire">
                      Nom du stagiaire
                    </label>
                    <select
                      id="edit-stagiaire"
                      name="stagiaire"
                      style={styles.select}
                      value={newEvaluation.stagiaire}
                      onChange={handleInputChange}
                    >
                      <option value="">Sélectionner un stagiaire</option>
                      {stagiaires.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="departement">
                      Département
                    </label>
                    <select
                      id="departement"
                      name="departement"
                      style={styles.select}
                      value={newEvaluation.departement}
                      onChange={handleInputChange}
                    >
                      <option value="">Sélectionner un département</option>
                      {departements.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="superviseur">
                      Superviseur
                    </label>
                    <input
                      type="text"
                      id="superviseur"
                      name="superviseur"
                      style={styles.input}
                      value={newEvaluation.superviseur}
                      onChange={handleInputChange}
                      placeholder="Nom du superviseur"
                    />
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="dateEvaluation">
                      Date d'évaluation
                    </label>
                    <input
                      type="text"
                      id="dateEvaluation"
                      name="dateEvaluation"
                      style={styles.input}
                      value={newEvaluation.dateEvaluation}
                      onChange={handleInputChange}
                      placeholder="JJ/MM/AAAA"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Évaluation des compétences</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Performance globale</div>
                    <RatingStars
                      rating={newEvaluation.performance}
                      onChange={(value) =>
                        setNewEvaluation((prev) => ({
                          ...prev,
                          performance: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Compétences techniques</div>
                    <RatingStars
                      rating={newEvaluation.competencesTechniques}
                      onChange={(value) =>
                        setNewEvaluation((prev) => ({
                          ...prev,
                          competencesTechniques: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Communication</div>
                    <RatingStars
                      rating={newEvaluation.communication}
                      onChange={(value) =>
                        setNewEvaluation((prev) => ({
                          ...prev,
                          communication: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Travail d'équipe</div>
                    <RatingStars
                      rating={newEvaluation.travailEquipe}
                      onChange={(value) =>
                        setNewEvaluation((prev) => ({
                          ...prev,
                          travailEquipe: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Ponctualité</div>
                    <RatingStars
                      rating={newEvaluation.ponctualite}
                      onChange={(value) =>
                        setNewEvaluation((prev) => ({
                          ...prev,
                          ponctualite: value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="commentaires">
                  Commentaires
                </label>
                <textarea
                  id="commentaires"
                  name="commentaires"
                  style={styles.textarea}
                  value={newEvaluation.commentaires}
                  onChange={handleInputChange}
                  placeholder="Commentaires sur la performance du stagiaire"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="recommandation">
                  Recommandation
                </label>
                <select
                  id="recommandation"
                  name="recommandation"
                  style={styles.select}
                  value={newEvaluation.recommandation}
                  onChange={handleInputChange}
                >
                  {recommandations.map((rec) => (
                    <option key={rec} value={rec}>
                      {rec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowAddModal(false)
                  setNewEvaluation({
                    stagiaire: "",
                    departement: "",
                    superviseur: "",
                    dateEvaluation: new Date().toLocaleDateString("fr-FR"),
                    performance: 3,
                    competencesTechniques: 3,
                    communication: 3,
                    travailEquipe: 3,
                    ponctualite: 3,
                    commentaires: "",
                    recommandation: "Recommandé",
                  })
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleAddEvaluation}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualisation d'évaluation */}
      {showViewModal && currentEvaluation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Détails de l'évaluation</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowViewModal(false)
                  setCurrentEvaluation(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.viewModalSection}>
                <div style={styles.viewModalSectionTitle}>Informations générales</div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>ID:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.id}</div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Stagiaire:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.stagiaire}</div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Département:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.departement}</div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Superviseur:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.superviseur}</div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Date d'évaluation:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.dateEvaluation}</div>
                </div>
              </div>

              <div style={styles.viewModalSection}>
                <div style={styles.viewModalSectionTitle}>Évaluation des compétences</div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Performance globale:</div>
                  <div style={styles.viewModalRating}>
                    <span style={styles.viewModalRatingValue(currentEvaluation.performance)}>
                      {currentEvaluation.performance}
                    </span>
                    <div style={styles.viewModalRatingStars(currentEvaluation.performance)}>
                      <RatingStars rating={currentEvaluation.performance} readOnly={true} />
                    </div>
                  </div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Compétences techniques:</div>
                  <div style={styles.viewModalRating}>
                    <span style={styles.viewModalRatingValue(currentEvaluation.competencesTechniques)}>
                      {currentEvaluation.competencesTechniques}
                    </span>
                    <div style={styles.viewModalRatingStars(currentEvaluation.competencesTechniques)}>
                      <RatingStars rating={currentEvaluation.competencesTechniques} readOnly={true} />
                    </div>
                  </div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Communication:</div>
                  <div style={styles.viewModalRating}>
                    <span style={styles.viewModalRatingValue(currentEvaluation.communication)}>
                      {currentEvaluation.communication}
                    </span>
                    <div style={styles.viewModalRatingStars(currentEvaluation.communication)}>
                      <RatingStars rating={currentEvaluation.communication} readOnly={true} />
                    </div>
                  </div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Travail d'équipe:</div>
                  <div style={styles.viewModalRating}>
                    <span style={styles.viewModalRatingValue(currentEvaluation.travailEquipe)}>
                      {currentEvaluation.travailEquipe}
                    </span>
                    <div style={styles.viewModalRatingStars(currentEvaluation.travailEquipe)}>
                      <RatingStars rating={currentEvaluation.travailEquipe} readOnly={true} />
                    </div>
                  </div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Ponctualité:</div>
                  <div style={styles.viewModalRating}>
                    <span style={styles.viewModalRatingValue(currentEvaluation.ponctualite)}>
                      {currentEvaluation.ponctualite}
                    </span>
                    <div style={styles.viewModalRatingStars(currentEvaluation.ponctualite)}>
                      <RatingStars rating={currentEvaluation.ponctualite} readOnly={true} />
                    </div>
                  </div>
                </div>

                <div style={styles.viewModalAverage}>
                  <div style={styles.viewModalAverageLabel}>Note moyenne:</div>
                  <div style={styles.viewModalAverageValue(calculateAverage(currentEvaluation))}>
                    {calculateAverage(currentEvaluation).toFixed(1)} / 5
                  </div>
                </div>
              </div>

              <div style={styles.viewModalSection}>
                <div style={styles.viewModalSectionTitle}>Commentaires et recommandation</div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Commentaires:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.commentaires}</div>
                </div>
                <div style={styles.viewModalRow}>
                  <div style={styles.viewModalLabel}>Recommandation:</div>
                  <div style={styles.viewModalValue}>{currentEvaluation.recommandation}</div>
                </div>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowViewModal(false)
                  setCurrentEvaluation(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Fermer
              </button>
              <button
                style={styles.confirmButton}
                onClick={() => {
                  setShowViewModal(false)
                  setShowEditModal(true)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification d'évaluation */}
      {showEditModal && currentEvaluation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Modifier l'évaluation</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowEditModal(false)
                  setCurrentEvaluation(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-stagiaire">
                      Nom du stagiaire
                    </label>
                    <select
                      id="edit-stagiaire"
                      name="stagiaire"
                      style={styles.select}
                      value={currentEvaluation.stagiaire}
                      onChange={(e) => handleInputChange(e, false)}
                    >
                      {stagiaires.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-departement">
                      Département
                    </label>
                    <select
                      id="edit-departement"
                      name="departement"
                      style={styles.select}
                      value={currentEvaluation.departement}
                      onChange={(e) => handleInputChange(e, false)}
                    >
                      {departements.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-superviseur">
                      Superviseur
                    </label>
                    <input
                      type="text"
                      id="edit-superviseur"
                      name="superviseur"
                      style={styles.input}
                      value={currentEvaluation.superviseur}
                      onChange={(e) => handleInputChange(e, false)}
                    />
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-dateEvaluation">
                      Date d'évaluation
                    </label>
                    <input
                      type="text"
                      id="edit-dateEvaluation"
                      name="dateEvaluation"
                      style={styles.input}
                      value={currentEvaluation.date.split("-").length==3 ? (currentEvaluation.date.split("-")[2]+"/"+currentEvaluation.date.split("-")[1]+"/"+currentEvaluation.date.split("-")[0]).toString() : currentEvaluation.date.toString()}
                      onChange={(e) => handleInputChange(e, false)}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Évaluation des compétences</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Performance globale</div>
                    <RatingStars
                      rating={currentEvaluation.performance}
                      onChange={(value) =>
                        setCurrentEvaluation((prev) => ({
                          ...prev,
                          performance: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Compétences techniques</div>
                    <RatingStars
                      rating={currentEvaluation.competencesTechniques}
                      onChange={(value) =>
                        setCurrentEvaluation((prev) => ({
                          ...prev,
                          competencesTechniques: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Communication</div>
                    <RatingStars
                      rating={currentEvaluation.communication}
                      onChange={(value) =>
                        setCurrentEvaluation((prev) => ({
                          ...prev,
                          communication: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Travail d'équipe</div>
                    <RatingStars
                      rating={currentEvaluation.travailEquipe}
                      onChange={(value) =>
                        setCurrentEvaluation((prev) => ({
                          ...prev,
                          travailEquipe: value,
                        }))
                      }
                    />
                  </div>
                  <div style={styles.ratingContainer}>
                    <div style={styles.ratingLabel}>Ponctualité</div>
                    <RatingStars
                      rating={currentEvaluation.ponctualite}
                      onChange={(value) =>
                        setCurrentEvaluation((prev) => ({
                          ...prev,
                          ponctualite: value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-commentaires">
                  Commentaires
                </label>
                <textarea
                  id="edit-commentaires"
                  name="commentaires"
                  style={styles.textarea}
                  value={currentEvaluation.commentaires}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-recommandation">
                  Recommandation
                </label>
                <select
                  id="edit-recommandation"
                  name="recommandation"
                  style={styles.select}
                  value={currentEvaluation.recommandation}
                  onChange={(e) => handleInputChange(e, false)}
                >
                  {recommandations.map((rec) => (
                    <option key={rec} value={rec}>
                      {rec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowEditModal(false)
                  setCurrentEvaluation(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleEditEvaluation}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression d'évaluation */}
      {showDeleteModal && currentEvaluation && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Supprimer l'évaluation</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowDeleteModal(false)
                  setCurrentEvaluation(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.deleteModalBody}>
              <div style={styles.deleteIcon}>🗑️</div>
              <p style={styles.deleteText}>
                Êtes-vous sûr de vouloir supprimer l'évaluation de{" "}
                <span style={styles.evaluationHighlight}>{currentEvaluation.stagiaire}</span> ?
                <br />
                Cette action est irréversible.
              </p>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowDeleteModal(false)
                  setCurrentEvaluation(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.deleteButton}
                onClick={handleDeleteEvaluation}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-color)")}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Evaluations

