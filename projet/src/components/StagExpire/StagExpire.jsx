"use client"

import { useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import { useEffect } from "react"
import useFetchStagiaire from "../../hooks/useFetchStagiaire"
import useFetchCand from "../../hooks/useFetchCand"
import useFetchSuivi from "../../hooks/useFetchSuivi"
import React from "react";
import * as XLSX from "xlsx";

function StagExpire({ internships: initialInternships }) {
  const [internships, setInternships] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showExportOptions, setShowExportOptions] = useState(false)
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [showCompletionOptions, setShowCompletionOptions] = useState({})
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")
  const {fetchStagiaire, data: dataStagiaire} = useFetchStagiaire()
  const {fetchCandidature, data: dataCand} = useFetchCand()
  const [stagiaires, setStagiaires] = useState([])
  const [suivis, setSuivis] = useState([])
  const {fetchSuivi, data: dataSuivi} = useFetchSuivi()

  const itemsPerPage = 10
  const totalPages = Math.ceil(internships.length / itemsPerPage)

  const filteredInternships = internships?.filter(
    (internship) =>
      internship.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship?.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination des résultats
  const paginatedInternships = filteredInternships.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Fonction pour voir les détails d'un stage
  const handleViewDetails = (id) => {
    alert(`Affichage des détails du stage ${id}`)
  }

  // Fonction pour télécharger le rapport
  const handleDownloadReport = (id) => {
    alert(`Téléchargement du rapport pour le stage ${id}`)
  }

  // Fonction pour archiver un stage
  const handleArchive = (id) => {
    alert(`Stage ${id} archivé`)
    setInternships(internships.filter((internship) => internship.id !== id))
  }

  // Fonction pour afficher/masquer les options de terminaison
  const toggleCompletionOptions = (id) => {
    setShowCompletionOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Fonction pour marquer un stage comme terminé normalement
  const handleMarkAsCompleted = (id) => {
    setInternships(
      internships.map((internship) => (internship.id === id ? { ...internship, status: "Terminé" } : internship)),
    )
    setShowCompletionOptions((prev) => ({
      ...prev,
      [id]: false,
    }))
    alert(`Stage ${id} marqué comme terminé normalement`)
  }
  useEffect(() => {
    if (dataStagiaire && dataCand) {
      const filteredInternships = dataStagiaire.filter((dt) => {
        return dataCand.some((dcm) => dcm.candidat === dt.id && dcm.statut.trim() === "Terminer");
      });
      setInternships(filteredInternships);
    } else {
      fetchStagiaire();
      fetchCandidature();
    }
  }, [dataStagiaire, dataCand]);

  useEffect(() => {
    if(dataSuivi){
      setSuivis(dataSuivi)
    }
    else{
      fetchSuivi()
    }
  }, [dataSuivi])

  // Fonction pour marquer un stage comme terminé prématurément
  const handleMarkAsEarlyTermination = (id) => {
    setInternships(
      internships.map((internship) =>
        internship.id === id ? { ...internship, status: "Terminé prématurément" } : internship,
      ),
    )
    setShowCompletionOptions((prev) => ({
      ...prev,
      [id]: false,
    }))
    alert(`Stage ${id} marqué comme terminé prématurément`)
  }

  // Fonction pour exporter les données
  const handleExport = (format) => {
    alert(`Exportation des données au format ${format}`)
    setShowExportOptions(false)
  }

  // Fonction pour filtrer les données
  const handleFilter = () => {
    setShowFilterOptions(!showFilterOptions)
    alert("Options de filtrage ouvertes")
  }

  // Fonction pour ajouter un stage
  const handleAddInternship = () => {
    const newId = `INT-${Math.floor(Math.random() * 1000)}`
    const newInternship = {
      id: newId,
      name: "Nouveau Stagiaire",
      department: "Informatique",
      startDate: "01/01/2023",
      endDate: "01/04/2023",
      supervisor: "Superviseur",
      email: "nouveau@example.com",
      phone: "0123456789",
      status: "En cours",
    }
    setInternships([...internships, newInternship])
    alert("Nouveau stage ajouté")
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

    // Fonction d'exportation Excel
    const handleExportToExcel = () => {
      // Créer un tableau avec les données à exporter
      const data = paginatedInternships.map((internship) => {
        const suivie = suivis.findLast((sv) => sv.stagiaire === internship.id);
        return {
          ID: internship.id,
          Nom: internship.nom,
          Email: internship.email,
          Département: internship.departement,
          "Date de début": internship.dateDebut,
          "Date de fin": internship.dateFin,
          Superviseur: suivie ? suivie.superviseur : "Non défini",
          Statut: suivie ? suivie.statut : "Non défini",
        };
      });
  
      // Créer la feuille de calcul à partir des données
      const ws = XLSX.utils.json_to_sheet(data);
  
      // Créer un classeur et ajouter la feuille
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Internships");
  
      // Exporter le fichier Excel
      XLSX.writeFile(wb, "internships_data.xlsx");
    };

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
    filterButton: {
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

      if (status === "Terminer") {
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
    actionButton: {
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "5px",
      borderRadius: "4px",
      color: "#666",
      transition: "background-color 0.2s",
    },
    completeButton: {
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-color)",
      border: "none",
      padding: "5px 8px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px",
      position: "relative",
    },
    completionOptions: {
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "white",
      border: "1px solid var(--border-color)",
      borderRadius: "6px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      marginTop: "5px",
      width: "200px",
    },
    completionOption: {
      padding: "8px 15px",
      cursor: "pointer",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "background-color 0.2s",
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
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "30px 15px" : "50px 20px",
      textAlign: "center",
    },
    emptyIcon: {
      fontSize: isMobile ? "36px" : "48px",
      marginBottom: "20px",
      color: "#ccc",
    },
    emptyTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      marginBottom: "10px",
    },
    emptyText: {
      fontSize: isMobile ? "13px" : "14px",
      color: "#666",
      maxWidth: "400px",
      marginBottom: "20px",
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
      gap: "8px",
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

  // Rendu mobile pour les stages expirés
  const renderMobileInternshipsList = () => {
    return (
      <div style={{ padding: "10px" }}>
        {paginatedInternships.map((internship, index) => (
          <div key={index} style={styles.mobileCard}>
            <div style={styles.mobileCardHeader}>
              <div style={styles.mobileCardTitle}>{internship.nom}</div>
              <div style={styles.mobileCardStatus}>
                <span style={styles.statusBadge(internship.status)}>{internship.status}</span>
              </div>
            </div>
            <div style={styles.mobileCardContent}>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>ID:</div>
                <div style={styles.mobileCardValue}>{internship.id}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Département:</div>
                <div style={styles.mobileCardValue}>{internship.department}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Période:</div>
                <div style={styles.mobileCardValue}>
                  {internship.startDate} - {internship.endDate}
                </div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Superviseur:</div>
                <div style={styles.mobileCardValue}>{internship.supervisor}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Email:</div>
                <div style={styles.mobileCardValue}>{internship.email}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Téléphone:</div>
                <div style={styles.mobileCardValue}>{internship.phone}</div>
              </div>
            </div>
            <div style={styles.mobileCardActions}>
              <button
                title="Voir les détails"
                style={styles.actionButton}
                onClick={() => handleViewDetails(internship.id)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                👁️
              </button>
              <button
                title="Télécharger le rapport"
                style={styles.actionButton}
                onClick={() => handleDownloadReport(internship.id)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                📄
              </button>
              {internship.statut !== "Terminer" && (
                <div style={{ position: "relative" }}>
                  <button
                    title="Options de terminaison"
                    style={styles.completeButton}
                    onClick={() => toggleCompletionOptions(internship.id)}
                    onMouseOver={(e) => (
                      (e.currentTarget.style.backgroundColor = "var(--primary-color)"),
                      (e.currentTarget.style.color = "white")
                    )}
                    onMouseOut={(e) => (
                      (e.currentTarget.style.backgroundColor = "var(--primary-light)"),
                      (e.currentTarget.style.color = "var(--primary-color)")
                    )}
                  >
                    ✓ Terminé
                  </button>
                  {showCompletionOptions[internship.id] && (
                    <div style={styles.completionOptions}>
                      <div
                        style={styles.completionOption}
                        onClick={() => handleMarkAsCompleted(internship.id)}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                      >
                        <span style={{ color: "#4CAF50" }}>✓</span> Terminé normalement
                      </div>
                      <div
                        style={styles.completionOption}
                        onClick={() => handleMarkAsEarlyTermination(internship.id)}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                      >
                        <span style={{ color: "#F44336" }}>⚠️</span> Terminé prématurément
                      </div>
                    </div>
                  )}
                </div>
              )}
              <button
                title="Archiver"
                style={styles.actionButton}
                onClick={() => handleArchive(internship.id)}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                📦
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
        <h2 style={styles.title}>Stages Expirés</h2>
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
          <button
            style={styles.filterButton}
            onClick={handleFilter}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            🔍 Filtrer
          </button>
        </div>
      </div>

      {filteredInternships.length > 0 ? (
        <>
          {isMobile ? (
            renderMobileInternshipsList()
          ) : (
            <div style={styles.responsiveTable}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>Nom</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Département</th>
                    <th style={styles.th}>Date de début</th>
                    <th style={styles.th}>Date de fin</th>
                    <th style={styles.th}>Superviseur</th>
                    {/* <th style={styles.th}>Téléphone</th> */}
                    <th style={styles.th}>Statut</th>
                    {/* <th style={styles.th}>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedInternships.map((internship, index) => {
                      const suivie= suivis.findLast((sv)=>sv.stagiaire == internship.id)
                    return(
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--hover-color)" }}>
                      <td style={styles.td}>{internship.id}</td>
                      <td style={styles.td}>{internship.nom}</td>
                      <td style={styles.td}>{internship.email}</td>
                      <td style={styles.td}>{internship.departement}</td>
                      <td style={styles.td}>{internship.dateDebut}</td>
                      <td style={styles.td}>{internship.dateFin}</td>
                      <td style={styles.td}>{suivie.superviseur}</td>
                      {/* <td style={styles.td}>{internship.phone}</td> */}
                      <td style={styles.td}>
                        <span style={styles.statusBadge(suivie.statut)}>{suivie.statut}</span>
                      </td>
                      {/* <td style={styles.td}>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <button
                            title="Voir les détails"
                            style={styles.actionButton}
                            onClick={() => handleViewDetails(internship.id)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            👁️
                          </button>
                          <button
                            title="Télécharger le rapport"
                            style={styles.actionButton}
                            onClick={() => handleDownloadReport(internship.id)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            📄
                          </button>
                          {internship.statut == "Terminer" && (
                            <div style={{ position: "relative" }}>
                              <button
                                title="Options de terminaison"
                                style={styles.completeButton}
                                onClick={() => toggleCompletionOptions(internship.id)}
                                onMouseOver={(e) => (
                                  (e.currentTarget.style.backgroundColor = "var(--primary-color)"),
                                  (e.currentTarget.style.color = "white")
                                )}
                                onMouseOut={(e) => (
                                  (e.currentTarget.style.backgroundColor = "var(--primary-light)"),
                                  (e.currentTarget.style.color = "var(--primary-color)")
                                )}
                              >
                                ✓ Terminé
                              </button>
                              {showCompletionOptions[internship.id] && (
                                <div style={styles.completionOptions}>
                                  <div
                                    style={styles.completionOption}
                                    onClick={() => handleMarkAsCompleted(internship.id)}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                                  >
                                    <span style={{ color: "#4CAF50" }}>✓</span> Terminé normalement
                                  </div>
                                  <div
                                    style={styles.completionOption}
                                    onClick={() => handleMarkAsEarlyTermination(internship.id)}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                                  >
                                    <span style={{ color: "#F44336" }}>⚠️</span> Terminé prématurément
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <button
                            title="Archiver"
                            style={styles.actionButton}
                            onClick={() => handleArchive(internship.id)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            📦
                          </button>
                        </div>
                      </td>*/}
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}

          <div style={styles.pagination}>
            <div style={styles.pageInfo}>
              Affichage de {(currentPage - 1) * itemsPerPage + 1} à{" "}
              {Math.min(currentPage * itemsPerPage, filteredInternships.length)} sur {filteredInternships.length}{" "}
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
        </>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📅</div>
          <h3 style={styles.emptyTitle}>Aucun stage expiré</h3>
          <p style={styles.emptyText}>
            Il n'y a actuellement aucun stage expiré dans le système. Les stages expirés apparaîtront ici une fois leur
            période terminée.
          </p>
          <button
            style={styles.addButton}
            onClick={handleAddInternship}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
          >
            + Ajouter un stage
          </button>
        </div>
      )}
    </div>
  )
}

export default StagExpire

