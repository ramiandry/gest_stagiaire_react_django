"use client"

import { useState } from "react"
import useMediaQuery from "../../hooks/Responsive"
import useFetchUser from "../../hooks/useFetchUser"
import useCreateUser from "../../hooks/useCreateUser"
import useUpdateUser from "../../hooks/useUpdateUser"
import { useEffect } from "react"
import useDeleteUser from "../../hooks/useDeleteUser"

function Utilisateur({ users: initialUsers }) {
  const [users, setUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newUser, setNewUser] = useState({
    nom: "",
    email: "",
    role: "Utilisateur",
    departement: "",
    password: "",
    confirmPassword: "",
  })
  const [formErrors, setFormErrors] = useState({})

  // Media queries
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isSmallScreen = useMediaQuery("(max-width: 1024px)")

  const roles = ["Administrateur", "Gestionnaire", "Superviseur", "Utilisateur"]
  const departements = [
    "Direction",
    "Ressources Humaines",
    "Informatique",
    "Marketing",
    "Finance",
    "Service Client",
    "Comptabilité",
  ]

  const {fetchUser, data} = useFetchUser()
  const {createUser} = useCreateUser()
  const {updateUser} = useUpdateUser()
  const {deleteUser} = useDeleteUser()

  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.departement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    if(data){
      setUsers(data)
    }else{
      fetchUser()
    }
  }, [data])
  

  const handleAddUser = () => {
    // Validation
    const errors = {}
    if (!newUser.nom.trim()) errors.nom = "Le nom est requis"
    if (!newUser.email.trim()) errors.email = "L'email est requis"
    if (!/\S+@\S+\.\S+/.test(newUser.email)) errors.email = "L'email est invalide"
    if (!newUser.departement) errors.departement = "Le département est requis"
    if (!newUser.password) errors.password = "Le mot de passe est requis"
    if (newUser.password.length < 6) errors.password = "Le mot de passe doit contenir au moins 6 caractères"
    if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Les mots de passe ne correspondent pas"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    // Ajout de l'utilisateur
    const newUserWithId = {
      ...newUser,
      id: users[users.length - 1]?.id+1 || 1,
      lastLogin: "Jamais",
      status: "Actif",
      statut : 1
    }

    createUser(newUserWithId)
    setUsers([...users, newUserWithId])
    setShowAddModal(false)
    setNewUser({
      nom: "",
      email: "",
      role: "Utilisateur",
      departement: "",
      password: "",
      confirmPassword: "",
    })
    setFormErrors({})
  }

  const handleEditUser = () => {
    if (!currentUser) return

    // Mise à jour de l'utilisateur
    const updatedUsers = users.map((user) => (user.id === currentUser.id ? {...currentUser, statut : currentUser.status == "Actif" ? 1 : 0} : user))

    updateUser({...currentUser, statut : currentUser.status == "Actif" ? 1 : 0})

    setUsers(updatedUsers)
    setShowEditModal(false)
    setCurrentUser(null)
  }

  const handleDeleteUser = () => {
    if (!currentUser) return

    // Suppression de l'utilisateur
    const updatedUsers = users.filter((user) => user.id !== currentUser.id)
    deleteUser(currentUser.id)
    setUsers(updatedUsers)
    setShowDeleteModal(false)
    setCurrentUser(null)
  }

  const handleInputChange = (e, isNewUser = true) => {
    const { name, value } = e.target

    if (isNewUser) {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }))
      // Effacer l'erreur lorsque l'utilisateur commence à corriger
      if (formErrors[name]) {
        setFormErrors((prev) => ({
          ...prev,
          [name]: "",
        }))
      }
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

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
      let color = "#4CAF50"
      let bgColor = "#E8F5E9"

      if (status === "Inactif") {
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
      width: isMobile ? "100%" : "500px",
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
    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid var(--border-color)",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "white",
    },
    errorText: {
      color: "var(--secondary-color)",
      fontSize: "12px",
      marginTop: "5px",
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
    userHighlight: {
      fontWeight: 600,
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

  // Rendu mobile pour les utilisateurs
  const renderMobileUsersList = () => {
    return (
      <div>
        {filteredUsers.map((user, index) => (
          <div key={index} style={styles.mobileCard}>
            <div style={styles.mobileCardHeader}>
              <div style={styles.mobileCardTitle}>{user.nom}</div>
              <div style={styles.mobileCardStatus}>
                <span style={styles.statusBadge(user.status)}>{user.status}</span>
              </div>
            </div>
            <div style={styles.mobileCardContent}>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Email:</div>
                <div style={styles.mobileCardValue}>{user.email}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Rôle:</div>
                <div style={styles.mobileCardValue}>{user.role}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Département:</div>
                <div style={styles.mobileCardValue}>{user.departement}</div>
              </div>
              <div style={styles.mobileCardItem}>
                <div style={styles.mobileCardLabel}>Dernière connexion:</div>
                <div style={styles.mobileCardValue}>{user.lastLogin}</div>
              </div>
            </div>
            <div style={styles.mobileCardActions}>
              <button
                title="Modifier"
                style={styles.actionButton}
                onClick={() => {
                  setCurrentUser(user)
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
                  setCurrentUser(user)
                  setShowDeleteModal(true)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                🗑️
              </button>
              <button
                title={user.status === "Actif" ? "Désactiver" : "Activer"}
                style={styles.actionButton}
                onClick={() => {
                  const updatedUsers = users.map((u) =>
                    u.id === user.id ? { ...u, status: u.status === "Actif" ? "Inactif" : "Actif" } : u,
                  )
                  setUsers(updatedUsers)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {user.status === "Actif" ? "🔒" : "🔓"}
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
        <h2 style={styles.title}>Gestion des Utilisateurs</h2>
        <div style={styles.actions}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            style={styles.addButton}
            onClick={() => setShowAddModal(true)}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
          >
            + Ajouter un utilisateur
          </button>
        </div>
      </div>

      {isMobile ? (
        renderMobileUsersList()
      ) : (
        <div style={styles.responsiveTable}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nom</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Rôle</th>
                <th style={styles.th}>Département</th>
                {/* <th style={styles.th}>Dernière connexion</th> */}
                <th style={styles.th}>Statut</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "var(--hover-color)" }}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.nom}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.role}</td>
                  <td style={styles.td}>{user.departement}</td>
                  {/* <td style={styles.td}>{user.lastLogin}</td> */}
                  <td style={styles.td}>
                    <span style={styles.statusBadge(user.statut ? "Actif" : "Inactif")}>{user.statut? "Actif" : "Inactif"}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: "flex" }}>
                      <button
                        title="Modifier"
                        style={styles.actionButton}
                        onClick={() => {
                          setCurrentUser(user)
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
                          setCurrentUser(user)
                          setShowDeleteModal(true)
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        🗑️
                      </button>
                      <button
                        title={user.status === "Actif" ? "Désactiver" : "Activer"}
                        style={styles.actionButton}
                        onClick={() => {
                          const updatedUsers = users.map((u) =>
                            u.id === user.id ? { ...u, status: u.status === "Actif" ? "Inactif" : "Actif", statut: u.status === "Actif" ? 0 : 1 } : u,
                          )
                          updateUser(updatedUsers[0])
                          setUsers(updatedUsers)
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        {user.status === "Actif" ? "🔒" : "🔓"}
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
          Affichage de 1 à {filteredUsers.length} sur {filteredUsers.length} entrées
        </div>
        <div style={styles.pageControls}>
          <button style={styles.pageButton}>⬅️</button>
          <button style={{ ...styles.pageButton, ...styles.activePageButton }}>1</button>
          <button style={styles.pageButton}>➡️</button>
        </div>
      </div>

      {/* Modal d'ajout d'utilisateur */}
      {showAddModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Ajouter un utilisateur</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowAddModal(false)
                  setFormErrors({})
                  setNewUser({
                    nom: "",
                    email: "",
                    role: "Utilisateur",
                    departement: "",
                    password: "",
                    confirmPassword: "",
                  })
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="nom">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  style={{
                    ...styles.input,
                    borderColor: formErrors.nom ? "var(--secondary-color)" : "var(--border-color)",
                  }}
                  value={newUser.nom}
                  onChange={handleInputChange}
                  placeholder="Nom et prénom"
                />
                {formErrors.nom && <div style={styles.errorText}>{formErrors.nom}</div>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="email">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  style={{
                    ...styles.input,
                    borderColor: formErrors.email ? "var(--secondary-color)" : "var(--border-color)",
                  }}
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="exemple@caisse-epargne.mg"
                />
                {formErrors.email && <div style={styles.errorText}>{formErrors.email}</div>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="role">
                  Rôle
                </label>
                <select id="role" name="role" style={styles.select} value={newUser.role} onChange={handleInputChange}>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="departement">
                  Département
                </label>
                <select
                  id="departement"
                  name="departement"
                  style={{
                    ...styles.select,
                    borderColor: formErrors.departement ? "var(--secondary-color)" : "var(--border-color)",
                  }}
                  value={newUser.departement}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un département</option>
                  {departements.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {formErrors.departement && <div style={styles.errorText}>{formErrors.departement}</div>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="password">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  style={{
                    ...styles.input,
                    borderColor: formErrors.password ? "var(--secondary-color)" : "var(--border-color)",
                  }}
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Mot de passe"
                />
                {formErrors.password && <div style={styles.errorText}>{formErrors.password}</div>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  style={{
                    ...styles.input,
                    borderColor: formErrors.confirmPassword ? "var(--secondary-color)" : "var(--border-color)",
                  }}
                  value={newUser.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmer le mot de passe"
                />
                {formErrors.confirmPassword && <div style={styles.errorText}>{formErrors.confirmPassword}</div>}
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowAddModal(false)
                  setFormErrors({})
                  setNewUser({
                    nom: "",
                    email: "",
                    role: "Utilisateur",
                    departement: "",
                    password: "",
                    confirmPassword: "",
                  })
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleAddUser}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification d'utilisateur */}
      {showEditModal && currentUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Modifier l'utilisateur</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowEditModal(false)
                  setCurrentUser(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-nom">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="edit-nom"
                  name="nom"
                  style={styles.input}
                  value={currentUser.nom}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-email">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  style={styles.input}
                  value={currentUser.email}
                  onChange={(e) => handleInputChange(e, false)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-role">
                  Rôle
                </label>
                <select
                  id="edit-role"
                  name="role"
                  style={styles.select}
                  value={currentUser.role}
                  onChange={(e) => handleInputChange(e, false)}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-departement">
                  Département
                </label>
                <select
                  id="edit-departement"
                  name="departement"
                  style={styles.select}
                  value={currentUser.departement}
                  onChange={(e) => handleInputChange(e, false)}
                >
                  {departements.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="edit-status">
                  Statut
                </label>
                <select
                  id="edit-status"
                  name="status"
                  style={styles.select}
                  value={currentUser.status}
                  onChange={(e) => handleInputChange(e, false)}
                >
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowEditModal(false)
                  setCurrentUser(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.confirmButton}
                onClick={handleEditUser}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression d'utilisateur */}
      {showDeleteModal && currentUser && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Supprimer l'utilisateur</h3>
              <button
                style={styles.closeButton}
                onClick={() => {
                  setShowDeleteModal(false)
                  setCurrentUser(null)
                }}
              >
                ×
              </button>
            </div>
            <div style={styles.deleteModalBody}>
              <div style={styles.deleteIcon}>🗑️</div>
              <p style={styles.deleteText}>
                Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
                <span style={styles.userHighlight}>{currentUser.nom}</span> ?
                <br />
                Cette action est irréversible.
              </p>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={styles.cancelButton}
                onClick={() => {
                  setShowDeleteModal(false)
                  setCurrentUser(null)
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--hover-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                Annuler
              </button>
              <button
                style={styles.deleteButton}
                onClick={handleDeleteUser}
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

export default Utilisateur

