"use client"

import { useEffect, useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import useFetchStage from "../../hooks/useFetchStage"
import useFetchUser from "../../hooks/useFetchUser"
import useCreateSuivi from "../../hooks/useCreateSuivi"

function AcceptRequestModal({ isOpen, onClose, requestId, onConfirm, id_stage, dataCandidat}) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const {fetchStage, data : dataStage} = useFetchStage()
  const [offres, setOffres] = useState([])
  const [users, setUsers] = useState([])
  const {fetchUser, data: dataUser} = useFetchUser()

  
  useEffect(()=>{
    if(dataStage){
      setOffres(dataStage.findLast((stage)=>stage.id_stage === id_stage))
    }else{
      fetchStage()
    }
  }, [dataStage])

  useEffect(() => {
    if(dataUser){
      console.log("id_user", requestId)
      setUsers(dataUser)
    }else{
      fetchUser()
    }
  }, [dataUser])

  const [formData, setFormData] = useState({
    encadreur: "",
    // fonction: "",
    // departement: "",
    // themeStage: "",
    // dateDebut: "",
    // dateFin: "",
    // duree: "",
    // description: "",
    // competencesRequises: "",
    // messagePersonnalise: "",
  })

  const [errors, setErrors] = useState({})

  const departements = [
    "Informatique",
    "Finance",
    "Marketing",
    "Ressources Humaines",
    "Comptabilité",
    "Service Client",
    "Direction",
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Effacer l'erreur lorsque l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.encadreur.trim()) newErrors.encadreur = "L'encadreur est requis"
    // if (!formData.fonction.trim()) newErrors.fonction = "La fonction est requise"
    // if (!formData.departement) newErrors.departement = "Le département est requis"
    // if (!formData.themeStage.trim()) newErrors.themeStage = "Le thème du stage est requis"
    // if (!formData.dateDebut.trim()) newErrors.dateDebut = "La date de début est requise"
    // if (!formData.dateFin.trim()) newErrors.dateFin = "La date de fin est requise"
    // if (!formData.duree.trim()) newErrors.duree = "La durée est requise"
    // if (!formData.description.trim()) newErrors.description = "La description est requise"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(requestId, users.find((user)=>user.id == requestId))
      formData.stage = parseInt(offres.id)
      formData.stagiaire = parseInt(users.find((user)=>user.id == requestId).id)
      formData.titre_stage=offres.mission
      formData.dateDebut=offres.dateDebut
      formData.email = users.find((user)=>user.id == requestId).email
      formData.password = users.find((user)=>user.id == requestId).password
      formData.superviseur=formData.encadreur.trim()
      console.log(formData)
      onConfirm(requestId, formData)
      onClose()
    }
  }

  if (!isOpen) return null

  const styles = {
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
      width: isMobile ? "100%" : "800px",
      maxWidth: "95%",
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
      position: "sticky",
      top: 0,
      backgroundColor: "white",
      zIndex: 1,
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
    formSection: {
      marginBottom: "25px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: 600,
      color: "var(--primary-color)",
      marginBottom: "15px",
      paddingBottom: "5px",
      borderBottom: "1px solid var(--primary-light)",
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
    inputError: {
      borderColor: "var(--secondary-color)",
    },
    errorText: {
      color: "var(--secondary-color)",
      fontSize: "12px",
      marginTop: "5px",
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
      position: "sticky",
      bottom: 0,
      backgroundColor: "white",
      zIndex: 1,
    },
    cancelButton: {
      backgroundColor: "white",
      color: "var(--text-dark)",
      border: "1px solid var(--border-color)",
      padding: "10px 20px",
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
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: 500,
      width: isMobile ? "100%" : "auto",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    requestInfo: {
      backgroundColor: "var(--primary-light)",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    requestId: {
      fontWeight: 600,
      color: "var(--primary-dark)",
    },
  }

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>Accepter la demande de stage</h3>
          <button style={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div style={styles.modalBody}>
          <div style={styles.requestInfo}>
            Vous êtes en train d'accepter la demande de <span style={styles.requestId}>{users.nom}</span>. Veuillez
            compléter les informations ci-dessous pour finaliser l'acceptation.
          </div>

          <div style={styles.formSection}>
            <h4 style={styles.sectionTitle}>Informations sur l'encadreur</h4>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="encadreur">
                    Nom de l'encadreur*
                  </label>
                  <input
                    type="text"
                    id="encadreur"
                    name="encadreur"
                    style={{
                      ...styles.input,
                      ...(errors.encadreur ? styles.inputError : {}),
                    }}
                    value={formData.encadreur}
                    onChange={handleChange}
                    placeholder="Nom complet de l'encadreur"
                  />
                  {errors.encadreur && <div style={styles.errorText}>{errors.encadreur}</div>}
                </div>
              </div>
              {/* <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="fonction">
                    Fonction*
                  </label>
                  <input
                    type="text"
                    id="fonction"
                    name="fonction"
                    style={{
                      ...styles.input,
                      ...(errors.fonction ? styles.inputError : {}),
                    }}
                    value={formData.fonction}
                    onChange={handleChange}
                    placeholder="Fonction de l'encadreur"
                  />
                  {errors.fonction && <div style={styles.errorText}>{errors.fonction}</div>}
                </div>
              </div> */}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="departement">
                Département*
              </label>
              <select
                id="departement"
                name="departement"
                style={{
                  ...styles.select,
                  ...(errors.departement ? styles.inputError : {}),
                }}
                value={offres.departement}
                onChange={handleChange}
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

          <div style={styles.formSection}>
            <h4 style={styles.sectionTitle}>Détails du stage</h4>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="themeStage">
                Thème du stage*
              </label>
              <input
                type="text"
                id="themeStage"
                name="themeStage"
                style={{
                  ...styles.input,
                  ...(errors.themeStage ? styles.inputError : {}),
                }}
                value={offres.mission}
                onChange={handleChange}
                placeholder="Ex: Développement d'une application web"
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="dateDebut">
                    Date de début*
                  </label>
                  <input
                    type="text"
                    id="dateDebut"
                    name="dateDebut"
                    style={{
                      ...styles.input,
                      ...(errors.dateDebut ? styles.inputError : {}),
                    }}
                    value={offres.dateDebut}
                    onChange={handleChange}
                    placeholder="JJ/MM/AAAA"
                  />
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="dateFin">
                    Date de fin*
                  </label>
                  <input
                    type="text"
                    id="dateFin"
                    name="dateFin"
                    style={{
                      ...styles.input,
                      ...(errors.dateFin ? styles.inputError : {}),
                    }}
                    value={offres.dateFin}
                    onChange={handleChange}
                    placeholder="JJ/MM/AAAA"
                  />
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="duree">
                    Durée*
                  </label>
                  <input
                    type="text"
                    id="duree"
                    name="duree"
                    style={{
                      ...styles.input,
                      ...(errors.duree ? styles.inputError : {}),
                    }}
                    value={offres.duree + "mois"}
                    onChange={handleChange}
                    placeholder="Ex: 3 mois"
                  />
                </div>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="description">
                Description du stage*
              </label>
              <textarea
                id="description"
                name="description"
                style={{
                  ...styles.textarea,
                  ...(errors.description ? styles.inputError : {}),
                }}
                value={offres.description}
                onChange={handleChange}
                placeholder="Description détaillée des tâches et objectifs du stage"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="competencesRequises">
                Compétences requises
              </label>
              <textarea
                id="competencesRequises"
                name="competencesRequises"
                style={styles.textarea}
                value={offres.competences}
                onChange={handleChange}
                placeholder="Compétences techniques ou personnelles requises pour ce stage"
              />
            </div>
          </div>

          {/* <div style={styles.formSection}>
            <h4 style={styles.sectionTitle}>Email de confirmation</h4>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="messagePersonnalise">
                Message personnalisé (optionnel)
              </label>
              <textarea
                id="messagePersonnalise"
                name="messagePersonnalise"
                style={styles.textarea}
                value={formData.messagePersonnalise}
                onChange={handleChange}
                placeholder="Ajoutez un message personnalisé qui sera inclus dans l'email envoyé au stagiaire"
              />
            </div>
          </div> */}
        </div>
        <div style={styles.modalFooter}>
          <button
            style={styles.cancelButton}
            onClick={onClose}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            Annuler
          </button>
          <button
            style={styles.confirmButton}
            onClick={handleSubmit}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
          >
            <span>✉️</span> Accepter et envoyer par email
          </button>
        </div>
      </div>
    </div>
  )
}

export default AcceptRequestModal

