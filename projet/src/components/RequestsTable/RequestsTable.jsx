"use client"
import { useEffect, useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import AcceptRequestModal from "../AcceptModel/AcceptModel"
import useFetchCand from "../../hooks/useFetchCand"
import useDeleteCand from "../../hooks/useDeleteCand"
import useUpdateCand from "../../hooks/useUpdateCand"
import useCreateSuivi from "../../hooks/useCreateSuivi"
import useSendEmail from "../../hooks/useSendEmail"
import useFetchStagiaire from "../../hooks/useFetchStagiaire"
import useFetchSuivi from "../../hooks/useFetchSuivi"
import useUpdateSuivi from "../../hooks/useUpdateSuivi"

function RequestsTable({ requests: initialRequests }) {
  const [requests, setRequests] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [currentRequestId, setCurrentRequestId] = useState(null)
  const [currentCandidatId, setCurrentCandidatId] = useState(null)
  const { fetchCandidature, data: dataCand } = useFetchCand()
  const [candidatures, setCandidatures] = useState([]);
  const [suivis, setSuivis] = useState([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const {deleteCandidature} = useDeleteCand()
  const {updateCandidature, data: updateData} = useUpdateCand()
  const {createSuivi} = useCreateSuivi()
  const {updateSuivi} = useUpdateSuivi()
  const {fetchSuivi, data : dataSuivi} = useFetchSuivi()
  const {sendEmail} = useSendEmail()
  const { data: dataRequests, fetchStagiaire } = useFetchStagiaire();

  // Fonction pour ouvrir le modal d'acceptation
  const openAcceptModal = (id, candidat) => {
    setCurrentRequestId(id)
    setCurrentCandidatId(candidat)
    setShowAcceptModal(true)
  }

  //fetchCandidature()
  useEffect(() => {
    setRequests(initialRequests)
  }, [initialRequests])

  useEffect(() => {
    if (dataCand) {
      setCandidatures(dataCand)
    }else{
      fetchCandidature()
    }
  }, [dataCand])

  useEffect(() => {
    if(dataRequests){
      setRequests(dataRequests.filter((request) => request.role === "stagiaire"));
    }else{
      fetchStagiaire();
    }
  }, [dataRequests]);

  useEffect(() => {
    if(dataSuivi){
      setSuivis(dataSuivi)
    }else{
      fetchSuivi()
    }
  }, [dataSuivi])

  // Fonction pour confirmer l'acceptation d'une demande
  const handleConfirmAccept = (id, formData) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, statut: "Accepter" } : request)))

    // Ici, vous pourriez implémenter l'envoi d'email avec les données du formulaire
    console.log("Demande Accepter avec les données suivantes:", formData)

    createSuivi(formData)
    sendEmail(formData)
    updateCandidature({ ...candidatures.findLast(cand => cand.candidat === id), statut: "Accepter"})
    fetchCandidature()
    fetchStagiaire()
    fetchSuivi()

    // Simuler l'envoi d'un email
    //alert(`Demande ${id} Accepter et email envoyé au stagiaire avec les détails du stage`)
  }

  // Fonction pour refuser une demande
  const handleReject = (id) => {
    setRequests(requests.map((request) => (request.id === id ? { ...request, statut: "Refuser" } : request)))
    updateCandidature({ ...candidatures.findLast(cand => cand.candidat === id), statut: "Refuser"})
    //alert(`Demande ${id} Refuser`)
  }

  // Fonction pour créer une nouvelle demande
  const handleNewRequest = () => {
    // const newId = `REQ-${Math.floor(Math.random() * 1000)}`
    // const newRequest = {
    //   id: newId,
    //   document: "Document.pdf",
    //   email: "nouveau@example.com",
    //   status: "En attente...",
    // }
    // setRequests([newRequest, ...requests])
    // alert("Nouvelle demande créée")

    fetchCandidature()
  }

  // Fonction pour lire un document
  const handleReadDocument = (url) => {
    window.open(`${url}`, "_blank")
  }

  // Fonction pour lire une demande
  const handleReadRequest = (url) => {
    window.open(`${url}`, "_blank")
  }

  // Fonction pour filtrer les demandes
  const handleFilter = () => {
    setShowFilter(!showFilter)
    alert("Filtrage des demandes")
  }

  // Fonction pour supprimer une demande
  const handleDelete = (id) => {
    setRequests(requests.filter((request) => request.id !== id))
    deleteCandidature(id)
  }

  const styles = {
    tableContainer: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    tableHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      padding: isMobile ? "15px 20px" : "20px 25px",
      borderBottom: "1px solid var(--border-color)",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "15px" : "0",
    },
    tableTitle: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: 600,
      color: "var(--text-dark)",
      margin: 0,
    },
    tableActions: {
      display: "flex",
      gap: "10px",
      width: isMobile ? "100%" : "auto",
      flexDirection: isMobile ? "column" : "row",
    },
    btnNew: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s",
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
    },
    btnFilter: {
      backgroundColor: "white",
      color: "var(--text-dark)",
      border: "1px solid var(--border-color)",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "all 0.2s",
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
    },
    tableContent: {
      flex: 1,
      overflowY: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHead: {
      backgroundColor: "var(--primary-light)",
      padding: isMobile ? "10px 15px" : "15px 20px",
      textAlign: "left",
      fontWeight: 600,
      color: "var(--primary-dark)",
      fontSize: isMobile ? "12px" : "14px",
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    tableCell: {
      padding: isMobile ? "10px 15px" : "15px 20px",
      borderBottom: "1px solid var(--border-color)",
      fontSize: isMobile ? "12px" : "14px",
    },
    requestId: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    idLabel: {
      fontWeight: 500,
      color: "var(--primary-color)",
      cursor: "pointer",
      textDecoration: "underline",
    },
    idValue: {
      color: "#666",
    },
    statusBadge: {
      display: "inline-block",
      padding: isMobile ? "3px 8px" : "5px 10px",
      backgroundColor: "#FFF8E1",
      color: "#FFA000",
      borderRadius: "20px",
      fontSize: isMobile ? "10px" : "12px",
      fontWeight: 500,
    },
    actionsCell: {
      display: "flex",
      gap: "10px",
    },
    btnAccept: {
      backgroundColor: "var(--primary-color)",
      color: "white",
      border: "none",
      padding: isMobile ? "6px 12px" : "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s",
      fontSize: isMobile ? "12px" : "14px",
    },
    btnReject: {
      backgroundColor: "var(--secondary-color)",
      color: "white",
      border: "none",
      padding: isMobile ? "6px 12px" : "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s",
      fontSize: isMobile ? "12px" : "14px",
    },
    btnDelete: {
      backgroundColor: "#9e9e9e",
      color: "white",
      border: "none",
      padding: isMobile ? "6px 12px" : "8px 15px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.2s",
      fontSize: isMobile ? "12px" : "14px",
    },
    mobileCard: {
      border: "1px solid var(--border-color)",
      borderRadius: "8px",
      padding: "15px",
      margin: "10px",
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
      color: "var(--primary-color)",
      cursor: "pointer",
      textDecoration: "underline",
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
      color: "var(--primary-color)",
      cursor: "pointer",
      textDecoration: "underline",
    },
    mobileCardActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "15px",
    },
  }

  // Rendu mobile pour les demandes
  const renderMobileRequestsList = () => {
    return (
      <div style={{ padding: "10px" }}>
        {requests.map((request, index) => {
          const candidature = candidatures.findLast(cand => cand.candidat === request.id)
          console.log(candidature.id)
          return(
          <div key={index} style={styles.mobileCard}>
            <div style={styles.mobileCardHeader}>
              <div style={styles.mobileCardTitle} onClick={() => handleReadRequest(request.id)}>
                Demande {request.id}
              </div>
              <div style={styles.mobileCardStatus}>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      request.status === "Accepter" ? "#E8F5E9" : request.status === "Refuser" ? "#FFEBEE" : "#FFF8E1",
                    color:
                      request.status === "Accepter" ? "#2E7D32" : request.status === "Refuser" ? "#C62828" : "#FFA000",
                  }}
                >
                  {request.status}
                </span>
              </div>
            </div>
            <div style={styles.mobileCardContent}>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Document:</div>
                <div style={styles.mobileCardValue} onClick={() => handleReadDocument(request.document)}>
                  {request.document}
                </div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Email:</div>
                <div style={{ ...styles.mobileCardValue, textDecoration: "none", cursor: "default" }}>
                  {request.email}
                </div>
              </div>
            </div>
            <div style={styles.mobileCardActions}>
              {request.status === "En attente" && (
                <>
                  <button
                    style={styles.btnAccept}
                    onClick={() => openAcceptModal(request.id)}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
                  >
                    Accepter
                  </button>
                  <button
                    style={styles.btnReject}
                    onClick={() => handleReject(request.id)}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-dark)")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-color)")}
                  >
                    Refuser
                  </button>
                </>
              )}
              {request.status !== "En attente" && (
                <>
                  <button
                    style={styles.btnAccept}
                    onClick={() =>{
                      alert(request.id)
                      updateCandidature({ ...candidatures.findLast(cand => cand.candidat === request.id), statut: "Terminer"})
                      updateSuivi({ ...suivis.findLast(suivi => suivi.candidat === request.id), statut: "Terminer"})
                      fetchCandidature()
                      fetchStagiaire()
                      fetchSuivi()
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
                  >
                    Terminé
                  </button>
                  <button
                    style={styles.btnDelete}
                    onClick={() => handleDelete(candidature.id)}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#757575")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#9e9e9e")}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </div>
        )})}
      </div>
    )
  }

  return (
    <div style={styles.tableContainer}>
      <div style={styles.tableHeader}>
        <h2 style={styles.tableTitle}>Gestion des Demandes</h2>
        <div style={styles.tableActions}>
          <button
            style={styles.btnNew}
            onClick={handleNewRequest}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
          >
            Nouvelle demande
          </button>
          <button
            style={styles.btnFilter}
            onClick={handleFilter}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            Filtrer
          </button>
        </div>
      </div>

      <div style={styles.tableContent}>
        {isMobile ? (
          renderMobileRequestsList()
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHead}>DEMANDES</th>
                <th style={styles.tableHead}>DOCUMENT COMPLEMENTAIRE</th>
                <th style={styles.tableHead}>EMAIL</th>
                <th style={styles.tableHead}>Status</th>
                <th style={styles.tableHead}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => {
                 const candidature = candidatures.find(cand => cand.candidat === request.id)
                 console.log(candidature?.id)
                if(candidature) 
              return(
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--hover-color)" }}>
                  <td style={styles.tableCell}>
                    <div style={styles.requestId}>
                      <span style={styles.idLabel} onClick={() => handleReadRequest(request.lettreMotivation)}>
                        Lire
                      </span>
                      <span style={styles.idValue}>Lettre de motivation</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.requestId}>
                      <span style={styles.idLabel} onClick={() => handleReadDocument(request.cv)}>
                        Lire
                      </span>
                      <span style={styles.idValue}>(C.V)</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>{request.email}</td>
                  <td style={styles.tableCell}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        backgroundColor:
                        candidature?.statut === "Accepter"
                            ? "#E8F5E9"
                            : candidature?.statut === "Refuser"
                              ? "#FFEBEE"
                              : "#FFF8E1",
                        color:
                        candidature?.statut === "Accepter"
                            ? "#2E7D32"
                            : candidature?.statut === "Refuser"
                              ? "#C62828"
                              : "#FFA000",
                      }}
                    >
                      {candidature?.statut}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionsCell}>
                      {candidature?.statut.trim() === "En attente" && (
                        <>
                          <button
                            style={styles.btnAccept}
                            onClick={() => openAcceptModal(request.id, request.candidat)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
                          >
                            Accepter
                          </button>
                          <button
                            style={styles.btnReject}
                            onClick={() => handleReject(request.id)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-dark)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-color)")}
                          >
                            Refuser
                          </button>
                        </>
                      )}
                      {candidature?.statut.trim() == "Accepter" && (
                        <>
                          <button
                            style={styles.btnAccept}
                            onClick={() => {
                              updateCandidature({ ...candidatures.findLast(cand => cand.candidat === request.id), statut: "Terminer"})
                              updateSuivi({ ...suivis.findLast(suivi => suivi.stagiaire === request.id), statut: "Terminer"})
                              fetchCandidature()
                              fetchStagiaire()
                              fetchSuivi()
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
                          >
                            Terminé
                          </button>
                          <button
                            style={styles.btnDelete}
                            onClick={() => handleDelete(candidature.id)}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#757575")}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#9e9e9e")}
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal d'acceptation de demande */}
      <AcceptRequestModal
        isOpen={showAcceptModal}
        dataCandidat={currentCandidatId}
        onClose={() => setShowAcceptModal(false)}
        requestId={currentRequestId}
        onConfirm={handleConfirmAccept}
      />
    </div>
  )
}

export default RequestsTable

