"use client"

import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar/Sidebar"
import Header from "../components/Header/Header"
import RequestsTable from "../components/RequestsTable/RequestsTable"
import Statistics from "../components/Statistics/Statistics"
import ExpiredInternships from "../components/StagExpire/StagExpire"
import UsersManagement from "../components/Utilisateur/Utilisateur"
import ReportInterface from "../components/Rapport/Rapport"
import OffreStage from "../components/OffreStage/OffreStage"
import Evaluations from "../components/Evaluations/Evaluations"
import useFetchStagiaire from "../hooks/useFetchStagiaire"
import SuiviStagiaire from "../components/SuiviStagiaire/SuiviStagiaire"

function Home({ onLogout }) {
  const [activeSection, setActiveSection] = useState("demandes")
  const { data: dataRequests, fetchStagiaire } = useFetchStagiaire();
  const [requests, setRequests] = useState([]);
  /*const [requests] = useState([
    {
      id: "1639742987_h",
      document: "aucun",
      email: "hc@gmbij.com",
      status: "En attente...",
    },
    {
      id: "1639742670_h",
      document: "aucun",
      email: "hc@gmij.com",
      status: "En attente...",
    },
    {
      id: "1639742588_h",
      document: "aucun",
      email: "hc@gmaij.com",
      status: "En attente...",
    },
    {
      id: "1639742430_h",
      document: "aucun",
      email: "hc@gmail.com",
      status: "En attente...",
    },
    {
      id: "1639580790_HOUSSOU",
      document: "aucun",
      email: "chriso@gmail.com",
      status: "En attente...",
    },
  ])*/

  // Données des stages expirés
  useEffect(() => {
    if(dataRequests){
      setRequests(dataRequests.filter((request) => request.role === "stagiaire"));
    }else{
      fetchStagiaire();
    }
  }, [dataRequests]);
  const expiredInternships = [
    {
      id: "STG-2023-001",
      name: "Rakoto Jean",
      department: "Informatique",
      startDate: "15/01/2023",
      endDate: "15/07/2023",
      supervisor: "Randria Marc",
      status: "Terminé",
      email: "rakoto.jean@gmail.com",
      phone: "034 12 345 67",
    },
    {
      id: "STG-2023-008",
      name: "Ranaivo Sophie",
      department: "Finance",
      startDate: "01/02/2023",
      endDate: "01/08/2023",
      supervisor: "Razafy Hery",
      status: "Terminé",
      email: "ranaivo.sophie@gmail.com",
      phone: "033 98 765 43",
    },
    {
      id: "STG-2023-012",
      name: "Andria Michel",
      department: "Marketing",
      startDate: "15/02/2023",
      endDate: "15/05/2023",
      supervisor: "Rakotondrabe Luc",
      status: "Terminé prématurément",
      email: "andria.michel@gmail.com",
      phone: "032 45 678 90",
    },
    {
      id: "STG-2023-015",
      name: "Razafindrakoto Aina",
      department: "Ressources Humaines",
      startDate: "01/03/2023",
      endDate: "31/08/2023",
      supervisor: "Rasoamanarivo Voahangy",
      status: "Terminé",
      email: "razafindrakoto.aina@gmail.com",
      phone: "034 56 789 01",
    },
    {
      id: "STG-2023-023",
      name: "Rabemananjara Paul",
      department: "Comptabilité",
      startDate: "15/03/2023",
      endDate: "15/06/2023",
      supervisor: "Rakotoarisoa Mamy",
      status: "Terminé",
      email: "rabemananjara.paul@gmail.com",
      phone: "033 12 345 67",
    },
    {
      id: "STG-2023-027",
      name: "Rasoanirina Fanja",
      department: "Service Client",
      startDate: "01/04/2023",
      endDate: "30/09/2023",
      supervisor: "Randriamanantena Eric",
      status: "Terminé",
      email: "rasoanirina.fanja@gmail.com",
      phone: "032 98 765 43",
    },
  ]

  // Données des utilisateurs
  const users = [
    {
      id: 1,
      nom: "Rakoto Jean",
      email: "rakoto.jean@caisse-epargne.mg",
      role: "Administrateur",
      department: "Direction",
      lastLogin: "12/03/2023 08:45",
      status: "Actif",
    },
    {
      id: 2,
      nom: "Ranaivo Sophie",
      email: "ranaivo.sophie@caisse-epargne.mg",
      role: "Gestionnaire",
      department: "Ressources Humaines",
      lastLogin: "11/03/2023 14:30",
      status: "Actif",
    },
    {
      id: 3,
      nom: "Andria Michel",
      email: "andria.michel@caisse-epargne.mg",
      role: "Superviseur",
      department: "Informatique",
      lastLogin: "10/03/2023 09:15",
      status: "Actif",
    },
    {
      id: 4,
      nom: "Razafindrakoto Aina",
      email: "razafindrakoto.aina@caisse-epargne.mg",
      role: "Utilisateur",
      department: "Marketing",
      lastLogin: "08/03/2023 11:20",
      status: "Inactif",
    },
    {
      id: 5,
      nom: "Rabemananjara Paul",
      email: "rabemananjara.paul@caisse-epargne.mg",
      role: "Gestionnaire",
      department: "Finance",
      lastLogin: "12/03/2023 10:05",
      status: "Actif",
    },
    {
      id: 6,
      nom: "Rasoanirina Fanja",
      email: "rasoanirina.fanja@caisse-epargne.mg",
      role: "Utilisateur",
      department: "Service Client",
      lastLogin: "09/03/2023 16:45",
      status: "Actif",
    },
  ]

  // Données statistiques
  const stats = {
    totalInterns: 124,
    totalRequests: 287,
    acceptedRequests: 156,
    rejectedRequests: 98,
    pendingRequests: 33,
    monthlyStats: [
      { month: "Jan", requests: 24, accepted: 18, rejected: 6 },
      { month: "Fév", requests: 32, accepted: 22, rejected: 10 },
      { month: "Mar", requests: 28, accepted: 19, rejected: 9 },
      { month: "Avr", requests: 35, accepted: 25, rejected: 10 },
      { month: "Mai", requests: 30, accepted: 20, rejected: 10 },
      { month: "Juin", requests: 38, accepted: 26, rejected: 12 },
    ],
  }

  // Données pour les rapports
  const reportData = {
    // Données mensuelles pour les demandes
    requestsMonthly: [
      { month: "Janvier", total: 24, accepted: 18, rejected: 6, pending: 0 },
      { month: "Février", total: 32, accepted: 22, rejected: 10, pending: 0 },
      { month: "Mars", total: 28, accepted: 19, rejected: 9, pending: 0 },
      { month: "Avril", total: 35, accepted: 25, rejected: 10, pending: 0 },
      { month: "Mai", total: 30, accepted: 20, rejected: 10, pending: 0 },
      { month: "Juin", total: 38, accepted: 26, rejected: 12, pending: 0 },
      { month: "Juillet", total: 42, accepted: 30, rejected: 8, pending: 4 },
      { month: "Août", total: 25, accepted: 15, rejected: 5, pending: 5 },
      { month: "Septembre", total: 33, accepted: 0, rejected: 0, pending: 33 },
      { month: "Octobre", total: 0, accepted: 0, rejected: 0, pending: 0 },
      { month: "Novembre", total: 0, accepted: 0, rejected: 0, pending: 0 },
      { month: "Décembre", total: 0, accepted: 0, rejected: 0, pending: 0 },
    ],

    // Données par département
    departmentStats: [
      { department: "Informatique", interns: 35, requests: 68 },
      { department: "Finance", interns: 28, requests: 52 },
      { department: "Marketing", interns: 22, requests: 45 },
      { department: "Ressources Humaines", interns: 15, requests: 38 },
      { department: "Comptabilité", interns: 12, requests: 30 },
      { department: "Service Client", interns: 8, requests: 25 },
      { department: "Direction", interns: 4, requests: 29 },
    ],

    // Données sur les stages
    internshipStats: {
      completed: 78,
      ongoing: 46,
      earlyTermination: 12,
      totalDuration: 4680, // en jours
      averageDuration: 182, // en jours (environ 6 mois)
      departmentDistribution: [
        { department: "Informatique", percentage: 28 },
        { department: "Finance", percentage: 22 },
        { department: "Marketing", percentage: 18 },
        { department: "Ressources Humaines", percentage: 12 },
        { department: "Comptabilité", percentage: 10 },
        { department: "Service Client", percentage: 6 },
        { department: "Direction", percentage: 4 },
      ],
    },

    // Données sur les utilisateurs
    userStats: {
      totalUsers: 24,
      activeUsers: 20,
      inactiveUsers: 4,
      roleDistribution: [
        { role: "Administrateur", count: 3 },
        { role: "Gestionnaire", count: 8 },
        { role: "Superviseur", count: 5 },
        { role: "Utilisateur", count: 8 },
      ],
      departmentDistribution: [
        { department: "Informatique", count: 6 },
        { department: "Finance", count: 5 },
        { department: "Marketing", count: 4 },
        { department: "Ressources Humaines", count: 3 },
        { department: "Comptabilité", count: 2 },
        { department: "Service Client", count: 2 },
        { department: "Direction", count: 2 },
      ],
    },
  }

  const styles = {
    appContainer: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--background-light)",
      overflow: "hidden",
    },
    contentWrapper: {
      padding: "20px",
      flex: 1,
      overflow: "auto",
      height: "calc(100vh - 80px)", // Hauteur de l'écran moins la hauteur du header
    },
  }

  const renderContent = () => {
    switch (activeSection) {
      case "statistiques":
        return <Statistics stats={stats} />
      case "demandes":
        return <RequestsTable requests={requests} />
      case "offre_stage":
        return <OffreStage />
      case "evaluations":
        return <Evaluations />
      case "expires":
        return <ExpiredInternships internships={expiredInternships} />
      case "utilisateurs":
        return <UsersManagement users={users} />
      case "rapport":
        return <ReportInterface reportData={reportData} />
      case "suivi_stagiaire":
        return <SuiviStagiaire />
      default:
        return <RequestsTable requests={requests} />
    }
  }

  return (
    <div style={styles.appContainer}>
      <Sidebar activeItem={activeSection} setActiveItem={setActiveSection} />
      <div style={styles.mainContent}>
        <Header onLogout={onLogout} />
        <div style={styles.contentWrapper}>{renderContent()}</div>
      </div>
    </div>
  )
}

export default Home

