"use client"

import { useEffect, useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import useCreateStage from "../../hooks/useCreateStage"
import useFetchStage from "../../hooks/useFetchStage"
import useUpdateStage from "../../hooks/useUpdateStage"
import useDeleteStage from "../../hooks/useDeleteStage"

function OffreStage() {
  const [offres, setOffres] = useState([])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentOffre, setCurrentOffre] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const {createStage, data: dataCreateStage} = useCreateStage()
  const {fetchStage, data : dataStage} = useFetchStage()
  const {updateStage} = useUpdateStage()
  const {deleteStage} = useDeleteStage()

  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")

  useEffect(()=>{
    if(dataStage){
      setOffres(dataStage.map(stage => ({...stage, titre : stage.mission, status:stage.statut ? "Active" : "Inactive" })))
    }else{
      fetchStage()
    }
  }, [dataStage])

  const [newOffre, setNewOffre] = useState({
    titre: "",
    departement: "",
    duree: "",
    dateDebut: "",
    dateFin: "",
    description: "",
    competences: "",
    places: 1,
    status: "Active",
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

  // Filtrer les offres en fonction de la recherche et du statut
  const filteredOffres = offres.filter(
    (offre) =>
      (offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.departement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || offre.status === filterStatus)
  )

  const handleAddOffre = () => {
    const competencesArray = newOffre.competences
      .split(",")
      .map((comp) => comp.trim())
      .filter((comp) => comp !== "")

    const newOffreWithId = {
      ...newOffre,
      id: offres[offres.length-1] ? offres[offres.length-1]?.id+1 : 1,
      mission: newOffre.titre,
      statut : newOffre.status == "Active" ? 1 : 0,
      dateDebut : newOffre.dateDebut.split("/").length == 3 ? newOffre.dateDebut.split("/")[2]+"-"+newOffre.dateDebut.split("/")[1]+"-"+newOffre.dateDebut.split("/")[0] : newOffre.dateDebut,
      dateFin : newOffre.dateFin.split("/").length == 3 ? newOffre.dateFin.split("/")[2]+"-"+newOffre.dateFin.split("/")[1]+"-"+newOffre.dateFin.split("/")[0] : newOffre.dateFin,
    }
    createStage(newOffreWithId)
    setOffres([...offres, newOffreWithId])
    setShowAddModal(false)
    setNewOffre({
      titre: "",
      departement: "",
      duree: "",
      dateDebut: "",
      dateFin: "",
      description: "",
      competences: "",
      places: 1,
      status: "Active",
    })
  }

  const handleEditOffre = () => {
    if (!currentOffre) return

    // Si les compétences sont une chaîne, les convertir en tableau
    var competences = currentOffre.competences
    if (typeof competences === "string") {
      competences = competences
        .split(",")
        .map((comp) => comp.trim())
        .filter((comp) => comp !== "")
    }

    const updatedOffre = {
      ...currentOffre,
      mission: currentOffre.titre,
      statut : currentOffre.status == "Active" ? 1 : 0,
      dateDebut : currentOffre.dateDebut.split("/").length == 3 ? currentOffre.dateDebut.split("/")[2]+"-"+currentOffre.dateDebut.split("/")[1]+"-"+currentOffre.dateDebut.split("/")[0] : currentOffre.dateDebut,
      dateFin : currentOffre.dateFin.split("/").length == 3 ? currentOffre.dateFin.split("/")[2]+"-"+currentOffre.dateFin.split("/")[1]+"-"+currentOffre.dateFin.split("/")[0] : currentOffre.dateFin,
      competences : Array.isArray(currentOffre.competences) ?currentOffre.competences.join(', ') : currentOffre.competences,
    }
    console.log(Array.isArray(currentOffre.competences) ?currentOffre.competences.join(', ') : currentOffre.competences)
    updateStage(updatedOffre);
    const reupdatedOffre={...updatedOffre, competences}
    const updatedOffres = offres.map((offre) => (offre.id === reupdatedOffre.id ? reupdatedOffre : offre))
    setOffres(updatedOffres)
    setShowEditModal(false)
    setCurrentOffre(null)
  }

  const handleDeleteOffre = () => {
    if (!currentOffre) return

    
    const updatedOffres = offres.filter((offre) => offre.id !== currentOffre.id)
    console.log("id", currentOffre.id)
    deleteStage(currentOffre.id)
    setOffres(updatedOffres)
    setShowDeleteModal(false)
    setCurrentOffre(null)
  }

  const handleInputChange = (e, isNewOffre = true) => {
    const { name, value } = e.target

    if (isNewOffre) {
      setNewOffre((prev) => ({
        ...prev,
        [name]: value,
      }))
    } else {
      setCurrentOffre((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
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
    statusBadge: (status) => {
      let color = "#4CAF50"
      let bgColor = "#E8F5E9"

      if (status === "Inactive") {
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
      marginRight: "5px",
    },
    competenceTag: {
      display: "inline-block",
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-dark)",
      padding: "3px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      marginRight: "5px",
      marginBottom: "5px",
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
    offreHighlight: {
      fontWeight: 600,
    },
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
      marginBottom: "10px",
    },
    cardStatus: {
      marginLeft: "auto",
    },
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
    cardTags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      marginTop: "5px",
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
    editButton: {
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-color)",
      border: "1px solid var(--primary-color)",
    },
    deleteCardButton: {
      backgroundColor: "#FFEBEE",
      color: "var(--secondary-color)",
      border: "1px solid var(--secondary-color)",
    },
  }

  // Rendu des cartes pour mobile
  const renderCards = () => {
    return (
      <div style={styles.cardsContainer}>
        {filteredOffres.map((offre) => (
          <div key={offre.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardTitle}>{offre.titre}</div>
                <div style={styles.cardDepartment}>{offre.departement}</div>
              </div>
              <div style={styles.cardStatus}>
                <span style={styles.statusBadge(offre.status)}>{offre.status}</span>
              </div>
            </div>

            <div style={styles.cardContent}>
              <div style={styles.cardSection}>
                <div style={styles.cardSectionTitle}>Description</div>
                <div style={styles.cardText}>{offre.description}</div>
              </div>

              <div style={styles.cardSection}>
                <div style={styles.cardSectionTitle}>Période</div>
                <div style={styles.cardText}>
                  {offre.dateDebut} - {offre.dateFin} ({offre.duree})
                </div>
              </div>

              <div style={styles.cardSection}>
                <div style={styles.cardSectionTitle}>Compétences requises</div>
                <div style={styles.cardTags}>
                  {offre.competences.map((comp, index) => (
                    <span key={index} style={styles.competenceTag}>
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.cardSection}>
                <div style={styles.cardSectionTitle}>Places disponibles</div>
                <div style={styles.cardText}>{offre.places}</div>
              </div>
            </div>

            <div style={styles.cardFooter}>
              <button
                style={{ ...styles.cardButton, ...styles.editButton }}
                onClick={() => {
                  setCurrentOffre({
                    ...offre,
                    competences: offre.competences.join(", "),
                  })
                  setShowEditModal(true)
                }}
              >
                ✏️ Modifier
              </button>
              <button
                style={{ ...styles.cardButton, ...styles.deleteCardButton }}
                onClick={() => {
                  setCurrentOffre(offre)
                  setShowDeleteModal(true)
                }}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Offres de Stage</h1>
        <div style={styles.actions}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Rechercher une offre..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={styles.filterContainer}>
            <span style={styles.filterLabel}>Statut:</span>
            <select
              style={styles.filterSelect}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
          >
            + Ajouter une offre
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
                  <th style={styles.th}>Titre</th>
                  <th style={styles.th}>Département</th>
                  <th style={styles.th}>Durée</th>
                  <th style={styles.th}>Période</th>
                  <th style={styles.th}>Compétences</th>
                  <th style={styles.th}>Places</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffres.map((offre, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--hover-color)" }}>
                    <td style={styles.td}>{offre.id}</td>
                    <td style={styles.td}>{offre.titre}</td>
                    <td style={styles.td}>{offre.departement}</td>
                    <td style={styles.td}>{offre.duree}</td>
                    <td style={styles.td}>
                      {offre.dateDebut} - {offre.dateFin}
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {offre.competences.toString().split(",")
                        .map((comp) => comp.trim())
                         .filter((comp) => comp !== "").map((comp, i) => (
                        <span key={i} style={styles.competenceTag}>
                        {comp}
                        </span>
                        ))}
                      </div>
                    </td>
                    <td style={styles.td}>{offre.places}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(offre.status)}>{offre.statut ? "Active" : "Inactive"}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex" }}>
                        <button
                          title="Modifier"
                          style={styles.actionButton}
                          onClick={() => {
                            setCurrentOffre({
                              ...offre,
                              competences: offre.competences,
                            })
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
                            setCurrentOffre(offre)
                            setShowDeleteModal(true)
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          🗑️
                        </button>
                        <button
                          title={offre.status === "Active" ? "Désactiver" : "Activer"}
                          style={styles.actionButton}
                          onClick={() => {
                            const updatedOffres = offres.map((o) =>
                              o.id === offre.id
                                ? { 
                                  ...o,
                                  mission: o.titre,
                                  statut : o.status == "Active" ? 1 : 0,
                                  dateDebut : o.dateDebut.split("/").length == 3 ? o.dateDebut.split("/")[2]+"-"+o.dateDebut.split("/")[1]+"-"+o.dateDebut.split("/")[0] : o.dateDebut,
                                  dateFin : o.dateFin.split("/").length == 3 ? o.dateFin.split("/")[2]+"-"+o.dateFin.split("/")[1]+"-"+o.dateFin.split("/")[0] : o.dateFin,
                                  competences : Array.isArray(o.competences) ?o.competences.join(', ') : o.competences, 
                                  status: o.status === "Active" ? "Inactive" : "Active" }
                                : o
                            )
                            setOffres(updatedOffres)
                            updateStage({...updatedOffres[0], status: updatedOffres.status!="Active"? 1 : 0})
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          {offre.status === "Active" ? "🔒" : "🔓"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={styles.pagination}>
          <div style={styles.pageInfo}>
            Affichage de 1 à {filteredOffres.length} sur {filteredOffres.length} entrées
          </div>
          <div style={styles.pageControls}>
            <button style={styles.pageButton}>⬅️</button>
            <button style={{ ...styles.pageButton, ...styles.activePageButton }}>1</button>
            <button style={styles.pageButton}>➡️</button>
          </div>
        </div>
      </div>

      {/* Modal d'ajout d'offre */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Ajouter une offre de stage</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowAddModal(false)
                  setNewOffre({
                    titre: "",
                    departement: "",
                    duree: "",
                    dateDebut: "",
                    dateFin: "",
                    description: "",
                    competences: "",
                    places: 1,
                    status: "Active",
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
                    <label style={styles.label} htmlFor="titre">
                      Titre de l'offre
                    </label>
                    <input
                      type="text"
                      id="titre"
                      name="titre"
                      style={styles.input}
                      value={newOffre.titre}
                      onChange={handleInputChange}
                      placeholder="Ex: Développeur Web Frontend"
                    />
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
                      value={newOffre.departement}
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
                    <label style={styles.label} htmlFor="duree">
                      Durée du stage
                    </label>
                    <input
                      type="number"
                      id="duree"
                      name="duree"
                      style={styles.input}
                      value={newOffre.duree}
                      onChange={handleInputChange}
                      placeholder="Ex: 6 mois"
                    />
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="places">
                      Nombre de places
                    </label>
                    <input
                      type="number"
                      id="places"
                      name="places"
                      style={styles.input}
                      value={newOffre.places}
                      onChange={handleInputChange}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="dateDebut">
                      Date de début
                    </label>
                    <input
                      type="text"
                      id="dateDebut"
                      name="dateDebut"
                      style={styles.input}
                      value={newOffre.dateDebut}
                      onChange={handleInputChange}
                      placeholder="JJ/MM/AAAA"
                    />
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="dateFin">
                      Date de fin
                    </label>
                    <input
                      type="text"
                      id="dateFin"
                      name="dateFin"
                      style={styles.input}
                      value={newOffre.dateFin}
                      onChange={handleInputChange}
                      placeholder="JJ/MM/AAAA"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  style={styles.textarea}
                  value={newOffre.description}
                  onChange={handleInputChange}
                  placeholder="Description détaillée de l'offre de stage"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="competences">
                  Compétences requises (séparées par des virgules)
                </label>
                <input
                  type="text"
                  id="competences"
                  name="competences"
                  style={styles.input}
                  value={newOffre.competences}
                  onChange={handleInputChange}
                  placeholder="Ex: HTML/CSS, JavaScript, React"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="status">
                  Statut
                </label>
                <select
                  id="status"
                  name="status"
                  style={styles.select}
                  value={newOffre.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowAddModal(false)
                  setNewOffre({
                    titre: "",
                    departement: "",
                    duree: 3,
                    dateDebut: "",
                    dateFin: "",
                    description: "",
                    competences: "",
                    places: 1,
                    status: "Active",
                  })
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleAddOffre}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification d'offre */}
      {showEditModal && currentOffre && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Modifier l'offre de stage</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowEditModal(false)
                  setCurrentOffre(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-titre">
                      Titre de l'offre
                    </label>
                    <input
                      type="text"
                      id="edit-titre"
                      name="titre"
                      style={styles.input}
                      value={currentOffre.titre}
                      onChange={(e) => handleInputChange(e, false)}
                    />
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
                      value={currentOffre.departement}
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
                    <label style={styles.label} htmlFor="edit-duree">
                      Durée du stage
                    </label>
                    <input
                      type="text"
                      id="edit-duree"
                      name="duree"
                      style={styles.input}
                      value={currentOffre.duree}
                      onChange={(e) => handleInputChange(e, false)}
                    />
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-places">
                      Nombre de places
                    </label>
                    <input
                      type="number"
                      id="edit-places"
                      name="places"
                      style={styles.input}
                      value={currentOffre.places}
                      onChange={(e) => handleInputChange(e, false)}
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-dateDebut">
                      Date de début
                    </label>
                    <input
                      type="text"
                      id="edit-dateDebut"
                      name="dateDebut"
                      style={styles.input}
                      value={currentOffre.dateDebut}
                      onChange={(e) => handleInputChange(e, false)}
                    />
                  </div>
                </div>
                <div style={styles.formColumn}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="edit-dateFin">
                      Date de fin
                    </label>
                    <input
                      type="text"
                      id="edit-dateFin"
                      name="dateFin"
                      style={styles.input}
                      value={currentOffre.dateFin}
                      onChange={(e) => handleInputChange(e, false)}
                    />
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-description">
                  Description
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  style={styles.textarea}
                  value={currentOffre.description}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-competences">
                  Compétences requises (séparées par des virgules)
                </label>
                <input
                  type="text"
                  id="edit-competences"
                  name="competences"
                  style={styles.input}
                  value={currentOffre.competences}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-status">
                  Statut
                </label>
                <select
                  id="edit-status"
                  name="status"
                  style={styles.select}
                  value={currentOffre.status}
                  onChange={(e) => handleInputChange(e, false)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowEditModal(false)
                  setCurrentOffre(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleEditOffre}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression d'offre */}
      {showDeleteModal && currentOffre && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Supprimer l'offre de stage</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowDeleteModal(false)
                  setCurrentOffre(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.deleteModalBody}>
              <div style={styles.deleteIcon}>🗑️</div>
              <p style={styles.deleteText}>
                Êtes-vous sûr de vouloir supprimer l'offre de stage{" "}
                <span style={styles.offreHighlight}>{currentOffre.titre}</span> ?
                <br />
                Cette action est irréversible.
              </p>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowDeleteModal(false)
                  setCurrentOffre(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.deleteButton}
                onClick={handleDeleteOffre}
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

export default OffreStage
