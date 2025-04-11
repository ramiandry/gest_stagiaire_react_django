"use client"

import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { FaBook, FaChartLine, FaFileAlt, FaInfo, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import useCreateJournal from "../hooks/useCreateJournal"
import useFetchJournal from "../hooks/useFetchJournal"
import useFetchSuivi from "../hooks/useFetchSuivi"
import useFetchStagiaire from "../hooks/useFetchStagiaire"
import useFetchCand from "../hooks/useFetchCand"
import useFetchStage from "../hooks/useFetchStage"
import useFetchEvaluation from "../hooks/useFetchEvaluation"
import useUpdateEvaluation from "../hooks/useUpdateEvaluation"
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`

const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 10;

  @media (max-width: 768px) {
    width: 70px;
    padding: 2rem 0;
  }
`

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 0;
    justify-content: center;
  }
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;

  @media (max-width: 768px) {
    display: none;
  }
`

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const MenuItem = styled.li`
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const MenuLink = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${(props) => (props.active ? "#3498db" : "white")};
  background: ${(props) => (props.active ? "rgba(52, 152, 219, 0.1)" : "transparent")};
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #3498db;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    justify-content: center;
  }
`

const MenuIcon = styled.span`
  margin-right: 1rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`

const MenuText = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    margin-left: 70px;
    padding: 1rem;
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  animation: ${slideIn} 0.5s ease-out;
`

const WelcomeText = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin: 0;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: bold;
`

const UserName = styled.span`
  font-weight: 500;
  color: #2c3e50;
`

const ContentSection = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`

const SectionIcon = styled.span`
  margin-right: 0.75rem;
  color: #3498db;
`

// Journal de bord components
const JournalForm = styled.form`
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`

const JournalEntries = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 1rem;
`

const JournalEntry = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  animation: ${fadeIn} 0.3s ease-out;
  
  &:last-child {
    border-bottom: none;
  }
`

const EntryDate = styled.div`
  font-weight: bold;
  color: #3498db;
  margin-bottom: 0.5rem;
`

const EntryTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`

const EntryDescription = styled.div`
  color: #555;
`

// Auto-evaluation components
const EvaluationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const EvaluationCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`

const SkillName = styled.h3`
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const RatingLabel = styled.span`
  color: #7f8c8d;
  font-size: 0.9rem;
`

const RatingInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  accent-color: #3498db;
`

const RatingValue = styled.span`
  font-weight: bold;
  color: #3498db;
  min-width: 30px;
  text-align: right;
`

// Information de stage components
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const InfoCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
`

const InfoIcon = styled.span`
  margin-right: 0.5rem;
  color: #3498db;
`

const InfoContent = styled.div`
  color: #555;
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #3498db;
    outline: none;
  }
`

// Rapport final components
const ReportSection = styled.div`
  margin-bottom: 2rem;
`

const ReportPreview = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  background-color: white;
`

const ReportHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const ReportTitle = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`

const ReportSubtitle = styled.h2`
  font-size: 1.2rem;
  color: #7f8c8d;
  font-weight: normal;
`

const ReportSection2 = styled.div`
  margin-bottom: 1.5rem;
`

const ReportSectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`

const ReportText = styled.p`
  color: #555;
  line-height: 1.6;
`

const ReportList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`

const ReportListItem = styled.li`
  margin-bottom: 0.5rem;
  color: #555;
`

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
`

const ReportTableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #ddd;
  color: #2c3e50;
`

const ReportTableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
  color: #555;
`

const ReportSignature = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
`

const SignatureBlock = styled.div`
  width: 45%;
`

const SignatureLine = styled.div`
  border-top: 1px solid #2c3e50;
  margin-top: 3rem;
  padding-top: 0.5rem;
  text-align: center;
  font-weight: 500;
  color: #2c3e50;
`

const InternDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("journal")
  const [journalEntries, setJournalEntries] = useState([])
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
    title: "",
    description: "",
  })
  const {fetchSuivi, data: dataSuivi} = useFetchSuivi()
  const {fetchStagiaire, data: dataStagiaire} = useFetchStagiaire()
  const {fetchCandidature, data: dataCand} = useFetchCand()
  const {fetchStage, data: dataStage} = useFetchStage()
  const {fetchEvaluation, data: dataEvaluation} = useFetchEvaluation()
  const {updateEvaluation} = useUpdateEvaluation()

  const {fetchJournal, data: journalData} = useFetchJournal()
  const {createJournal}=useCreateJournal()
  const [suivis, setSuivis] = useState([])
  const [journals, setJournals] = useState([])
  const [evaluations, setEvaluations] = useState([])
  const [stages, setStages] = useState([])
  const [stagiaires, setStagiaires] = useState([])
  const [cands, setCands] = useState([])
  const user_id = localStorage.getItem('user_id')

  const [skills, setSkills] = useState(["Performance globale","Compétences techniques","Communication","Travail d'équipe","Ponctualité"])

  const [internInfo, setInternInfo] = useState({
    dateDebut: "",
    dateFin: "",
    company: "",
    superviseur: "",
    superviseurEmail: "",
    mission: "",
  })

  const reportRef = useRef(null); // Référence vers le contenu du rapport

  const generatePDF = () => {
    const input = reportRef.current;
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Ajouter l'image dans le PDF
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 277);
      
      // Sauvegarder le PDF
      pdf.save('rapport_stage.pdf');
    });
  };


  // Simuler un utilisateur connecté
  const user = {
    name: stagiaires?.nom || "",
    initials: stagiaires?.nom ? stagiaires.nom.split(" ").map((n) => n[0]).join("") : "",
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
    if(journalData){
      setJournals(journalData)
    }
    else{
      fetchJournal()
    }
  }, [journalData])

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
    if(dataStagiaire){
      setStagiaires({
        journalEntries: journals.filter((journal)=> journal.stagiaire == user_id),
        ...suivis.findLast((sv)=>sv.stagiaire == user_id),
        status : suivis.findLast((sv)=>sv.stagiaire == user_id)?.statut,
        skills: {...evaluations.findLast((evl)=>evl.stagiaire == user_id)},
        ...dataStagiaire.find((stagiaire)=>stagiaire.id == user_id),
        id: dataStagiaire.find((stagiaire)=>stagiaire.id == user_id).id
      })
    } else{
      fetchStagiaire()
    }
  }, [dataStagiaire])

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    // Supprimez ou commentez ce useEffect qui vérifie l'authentification
    // useEffect(() => {
    //   const currentUser = localStorage.getItem("currentUser");
    //   if (!currentUser) {
    //     navigate("/login");
    //   }
    // }, [navigate]);
  }, [navigate])

  useEffect(() => {
    // Charger les données sauvegardées du localStorage
    const savedJournal = localStorage.getItem("journalEntries")
    const savedSkills = localStorage.getItem("skillsEvaluation")
    const savedInfo = localStorage.getItem("internshipInfo")

    if (savedJournal) setJournalEntries(JSON.parse(savedJournal))
    if (savedSkills) setSkills(JSON.parse(savedSkills))
    if (savedInfo) setInternInfo(JSON.parse(savedInfo))
  }, [])

  useEffect(() => {
    if(journalData){
      setJournalEntries(journalData.map((data)=>({
        ...data,
        title: data.titre
      })))
    }else{
      fetchJournal()
    }
  }, [journalData])
  

  // Sauvegarder les données dans localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries))
  }, [journalEntries])

  useEffect(() => {
    localStorage.setItem("skillsEvaluation", JSON.stringify(skills))
  }, [skills])

  useEffect(() => {
    localStorage.setItem("internshipInfo", JSON.stringify(internInfo))
  }, [internInfo])

  const handleEntryChange = (e) => {
    const { name, value } = e.target
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddEntry = (e) => {
    e.preventDefault()
    if (!newEntry.title || !newEntry.description) return

    setJournalEntries((prev) => [
      {
        id: Date.now(),
        ...newEntry,
      },
      ...prev,
    ])

    createJournal({...newEntry, stagiaire: parseInt(localStorage.getItem('user_id')), titre: newEntry.title})

    setNewEntry({
      date: new Date().toISOString().split("T")[0],
      title: "",
      description: "",
    })
  }

  const handleSkillChange = (id, value) => {

    updateEvaluation({...stagiaires.skills, [id]: value})
    setStagiaires((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [id]: value,
      },
    }))

  }

  const handleInfoChange = (e) => {
    const { name, value } = e.target
    setInternInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Modifier la fonction handleLogout pour supprimer les données de l'utilisateur
  const handleLogout = () => {
    // Supprimer les informations de l'utilisateur du localStorage
    localStorage.removeItem("currentUser")
    // Rediriger vers la page de connexion
    navigate("/login")
  }

  const calculateAverageRating = () => {
    const sum = parseInt(stagiaires.skills.auto_performance) + parseInt(stagiaires.skills.auto_competencesTechniques) + parseInt(stagiaires.skills.auto_communication) + parseInt(stagiaires.skills.auto_travailEquipe) + parseInt(stagiaires.skills.auto_ponctualite)
    return (sum / skills.length).toFixed(1)
  }

  const generateReport = () => {
    // Dans une application réelle, vous pourriez générer un PDF ici
    // Pour cet exemple, nous allons juste afficher un message
    alert("Rapport généré avec succès!")

    // Vous pourriez également ouvrir une nouvelle fenêtre avec le rapport formaté
    // window.open("/report", "_blank");
  }

  const signaturePad = useRef(null); // Référence pour le canevas de signature

  // Fonction pour nettoyer le canevas
  const clearSignature = () => {
    signaturePad.current.clear();
  };

  // Fonction pour obtenir l'image de la signature
  const saveSignature = () => {
    const signatureImage = signaturePad.current.toDataURL();
    console.log(signatureImage); // Affiche l'image de la signature en format base64
  };


  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarHeader>
          <Logo>Suivi Stagiaire</Logo>
        </SidebarHeader>

        <SidebarMenu>
          <MenuItem>
            <MenuLink active={activeTab === "journal"} onClick={() => setActiveTab("journal")}>
              <MenuIcon>
                <FaBook />
              </MenuIcon>
              <MenuText>Journal de bord</MenuText>
            </MenuLink>
          </MenuItem>
          {Object.keys(stagiaires.skills || {}).length > 0 && (
          <MenuItem>
            <MenuLink active={activeTab === "evaluation"} onClick={() => setActiveTab("evaluation")}>
              <MenuIcon>
                <FaChartLine />
              </MenuIcon>
              <MenuText>Auto-évaluation</MenuText>
            </MenuLink>
          </MenuItem>)}

          {Object.keys(stagiaires.skills || {}).length > 0 && (
          <MenuItem>
            <MenuLink active={activeTab === "info"} onClick={() => setActiveTab("info")}>
              <MenuIcon>
                <FaInfo />
              </MenuIcon>
              <MenuText>Informations</MenuText>
            </MenuLink>
          </MenuItem>)}


          {Object.keys(stagiaires.skills || {}).length > 0 && (
          <MenuItem>
            <MenuLink active={activeTab === "report"} onClick={() => setActiveTab("report")}>
              <MenuIcon>
                <FaFileAlt />
              </MenuIcon>
              <MenuText>Rapport final</MenuText>
            </MenuLink>
          </MenuItem>)}
        </SidebarMenu>

        <div style={{ marginTop: "auto" }}>
          <MenuItem>
            <MenuLink onClick={handleLogout}>
              <MenuIcon>
                <FaSignOutAlt />
              </MenuIcon>
              <MenuText>Déconnexion</MenuText>
            </MenuLink>
          </MenuItem>
        </div>
      </Sidebar>

      <MainContent>
        <Header>
          <WelcomeText>Bonjour, {user.name}</WelcomeText>
          <UserInfo>
            <UserAvatar>{user.initials}</UserAvatar>
            <UserName>{user.name}</UserName>
          </UserInfo>
        </Header>

        {activeTab === "journal" && (
          <ContentSection>
            <SectionTitle>
              <SectionIcon>
                <FaBook />
              </SectionIcon>
              Journal de bord
            </SectionTitle>

            <JournalForm onSubmit={handleAddEntry}>
              <FormGroup>
                <Label htmlFor="date">Date</Label>
                <Input type="date" id="date" name="date" value={newEntry.date} onChange={handleEntryChange} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="title">Titre de l'activité</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ex: Réunion d'équipe, Formation sur..."
                  value={newEntry.title}
                  onChange={handleEntryChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Description et apprentissages</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez l'activité et ce que vous avez appris..."
                  value={newEntry.description}
                  onChange={handleEntryChange}
                />
              </FormGroup>

              <Button type="submit">Ajouter l'entrée</Button>
            </JournalForm>

            <SectionTitle>Entrées récentes</SectionTitle>

            <JournalEntries>
              {journalEntries.length === 0 ? (
                <p>Aucune entrée pour le moment. Commencez à documenter votre stage!</p>
              ) : (
                journalEntries.map((entry) => (
                  <JournalEntry key={entry.id}>
                    <EntryDate>
                      {new Date(entry.date).toLocaleDateString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </EntryDate>
                    <EntryTitle>{entry.title}</EntryTitle>
                    <EntryDescription>{entry.description}</EntryDescription>
                  </JournalEntry>
                ))
              )}
            </JournalEntries>
          </ContentSection>
        )}

        {activeTab === "evaluation" && (
          <ContentSection>
            <SectionTitle>
              <SectionIcon>
                <FaChartLine />
              </SectionIcon>
              Auto-évaluation des compétences
            </SectionTitle>

            <p>Évaluez vos compétences sur une échelle de 1 à 5 (1 = Débutant, 5 = Expert)</p>

            <EvaluationGrid>
              {skills.map((skill, key) => {
                  
                  let skl = 0;
                  let skl_auto = 0;
                  let skl_name = ""
                  if(key==0){
                    skl = stagiaires.skills.performance
                    skl_auto = stagiaires.skills.auto_performance
                    skl_name="performance"
                  }else if(key==1){
                    skl = stagiaires.skills.competencesTechniques
                    skl_auto = stagiaires.skills.auto_competencesTechniques
                    skl_name = "competencesTechniques"
                  }else if(key==2){
                    skl = stagiaires.skills.communication
                    skl_auto = stagiaires.skills.auto_communication
                    skl_name = "communication"
                  }else if(key==3){
                    skl = stagiaires.skills.travailEquipe
                    skl_auto = stagiaires.skills.auto_travailEquipe
                    skl_name = "travailEquipe"
                  } else if(key==4){
                    skl = stagiaires.skills.ponctualite
                    skl_auto = stagiaires.skills.auto_ponctualite
                    skl_name = "ponctualite"
                  }
                return (
                <EvaluationCard key={key}>
                  <SkillName>{skill}</SkillName>
                  <RatingContainer>
                    <RatingLabel>Débutant</RatingLabel>
                    <RatingLabel>Expert</RatingLabel>
                  </RatingContainer>
                  <RatingContainer>
                    <RatingInput
                      type="range"
                      min="1"
                      max="5"
                      value={skl_auto}
                      onChange={(e) => handleSkillChange("auto_"+skl_name, e.target.value)}
                    />
                  </RatingContainer>
                  <RatingContainer>
                    <RatingValue>{skl_auto}/5</RatingValue>
                  </RatingContainer>
                </EvaluationCard>
              )})}
            </EvaluationGrid>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <h3>Évaluation moyenne: {calculateAverageRating()}/5</h3>
              <p>Continuez à travailler sur vos compétences pour améliorer votre score!</p>
            </div>
          </ContentSection>
        )}

        {activeTab === "info" && (
          <ContentSection>
            <SectionTitle>
              <SectionIcon>
                <FaInfo />
              </SectionIcon>
              Informations du stage
            </SectionTitle>

            <FormGroup>
              <Label htmlFor="dateDebut">Date de début</Label>
              <Input
                type="date"
                id="dateDebut"
                name="dateDebut"
                value={stagiaires.dateDebut}
                onChange={handleInfoChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="dateFin">Date de fin</Label>
              <Input type="date" id="dateFin" name="dateFin" value={stagiaires.dateFin} onChange={handleInfoChange} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="company">Entreprise</Label>
              <Input
                type="text"
                id="company"
                name="company"
                placeholder="Nom de l'entreprise"
                value="Caisse d'Epargne de Madagascar"
                onChange={handleInfoChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="superviseur">Maître de stage</Label>
              <Input
                type="text"
                id="superviseur"
                name="superviseur"
                placeholder="Nom et prénom"
                value={stagiaires.superviseur}
                onChange={handleInfoChange}
              />
            </FormGroup>

            {/* <FormGroup>
              <Label htmlFor="superviseurEmail">Email du maître de stage</Label>
              <Input
                type="email"
                id="superviseurEmail"
                name="superviseurEmail"
                placeholder="email@exemple.com"
                value={internInfo.superviseurEmail}
                onChange={handleInfoChange}
              />
            </FormGroup> */}

            <FormGroup>
              <Label htmlFor="mission">Description</Label>
              <Textarea
                id="mission"
                name="mission"
                placeholder="Décrivez les mission qui vous ont été confiées..."
                value={stagiaires.mission}
                onChange={handleInfoChange}
              />
            </FormGroup>

            {/* <Button type="button" onClick={() => alert("Informations enregistrées!")}>
              Enregistrer les informations
            </Button> */}
          </ContentSection>
        )}

        {activeTab === "report" && (
          <ContentSection>
            <SectionTitle>
              <SectionIcon>
                <FaFileAlt />
              </SectionIcon>
              Rapport final de stage
            </SectionTitle>

            <p>Ce rapport résume votre expérience de stage et sera utilisé pour la validation finale.</p>

            <ReportPreview ref={reportRef}>
              <ReportHeader>
                <ReportTitle>RAPPORT DE STAGE</ReportTitle>
                <ReportSubtitle>Caisse d'Epargne de Madagascar</ReportSubtitle>
                <ReportSubtitle>
                  {stagiaires.dateDebut && stagiaires.dateFin
                    ? `Du ${new Date(stagiaires.dateDebut).toLocaleDateString("fr-FR")} au ${new Date(stagiaires.dateFin).toLocaleDateString("fr-FR")}`
                    : "Période du stage"}
                </ReportSubtitle>
              </ReportHeader>

              <ReportSection2>
                <ReportSectionTitle>Informations générales</ReportSectionTitle>
                <ReportText>
                  <strong>Stagiaire:</strong> {stagiaires.nom}
                  <br />
                  <strong>Entreprise:</strong> {"Caisse d'Epargne de Madagascar"}
                  <br />
                  <strong>Maître de stage:</strong> {stagiaires.superviseur || "[Nom du maître de stage]"}
                  <br />
                  <strong>Période:</strong>{" "}
                  {stagiaires.dateDebut && stagiaires.dateFin
                    ? `Du ${new Date(stagiaires.dateDebut).toLocaleDateString("fr-FR")} au ${new Date(stagiaires.dateFin).toLocaleDateString("fr-FR")}`
                    : "Du [date] au [date]"}
                </ReportText>
              </ReportSection2>

              <ReportSection2>
                <ReportSectionTitle>mission réalisées</ReportSectionTitle>
                <ReportText>
                  {stagiaires.mission ||
                    "Aucune mission n'a été enregistrée. Veuillez compléter la section Informations."}
                </ReportText>
              </ReportSection2>

              <ReportSection2>
                <ReportSectionTitle>Compétences développées</ReportSectionTitle>
                <ReportTable>
                  <thead>
                    <tr>
                      <ReportTableHeader>Compétence</ReportTableHeader>
                      <ReportTableHeader>Auto-évaluation</ReportTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill, key) => {
                      let skl = null;
                      let skl_auto = null;
                      let skl_name = ""
                      if(key==0){
                        skl = stagiaires.skills.performance
                        skl_auto = stagiaires.skills.auto_performance
                        skl_name="performance"
                      }else if(key==1){
                        skl = stagiaires.skills.competencesTechniques
                        skl_auto = stagiaires.skills.auto_competencesTechniques
                        skl_name = "competencesTechniques"
                      }else if(key==2){
                        skl = stagiaires.skills.communication
                        skl_auto = stagiaires.skills.auto_communication
                        skl_name = "communication"
                      }else if(key==3){
                        skl = stagiaires.skills.travailEquipe
                        skl_auto = stagiaires.skills.auto_travailEquipe
                        skl_name = "travailEquipe"
                      } else if(key==4){
                        skl = stagiaires.skills.ponctualite
                        skl_auto = stagiaires.skills.auto_ponctualite
                        skl_name = "ponctualite"
                      }
                      console.log(skl_auto)
                      return(
                      <tr key={key}>
                        <ReportTableCell>{skill}</ReportTableCell>
                        <ReportTableCell>{skl_auto}/5</ReportTableCell>
                      </tr>
                    )})}
                  </tbody>
                </ReportTable>
              </ReportSection2>

              <ReportSection2>
                <ReportSectionTitle>Journal de bord - Activités principales</ReportSectionTitle>
                {journalEntries.length === 0 ? (
                  <ReportText>Aucune entrée n'a été enregistrée dans le journal de bord.</ReportText>
                ) : (
                  <ReportList>
                    {journalEntries.slice(0, 5).map((entry) => (
                      <ReportListItem key={entry.id}>
                        <strong>{new Date(entry.date).toLocaleDateString("fr-FR")}:</strong> {entry.title}
                      </ReportListItem>
                    ))}
                  </ReportList>
                )}
              </ReportSection2>

              <ReportSection2>
                <ReportSectionTitle>Conclusion</ReportSectionTitle>
                <ReportText>
                  Ce stage a été une expérience enrichissante qui m'a permis de développer mes compétences
                  professionnelles et d'acquérir une expérience précieuse dans le domaine. J'ai pu mettre en pratique
                  les connaissances théoriques acquises durant ma formation et découvrir le fonctionnement d'une
                  entreprise.
                </ReportText>
              </ReportSection2>

              <ReportSignature>
                <SignatureBlock>
                  <div style={{ display : "flex"}}>
                    <SignatureCanvas
                      ref={signaturePad}
                      penColor="black"  // Couleur de l'encre de la signature
                      canvasProps={{ width: 300, height: 150, className: 'signature-canvas', style : {border:"1px solid #c6c6c6", borderRadius : 20, margin : "auto"} }} // Dimensions et classe CSS
                    />
                  </div>
                
                    
                  <SignatureLine>Signature du stagiaire</SignatureLine>
                </SignatureBlock>
                <SignatureBlock>
                <div
                      style={{ width: 300, height: 150, className: 'signature-canvas', margin : "auto" }} // Dimensions et classe CSS
                    >
                      </div>
                  <SignatureLine>Signature d'encadreur professionnel</SignatureLine>
                </SignatureBlock>
              </ReportSignature>
            </ReportPreview>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Button onClick={generatePDF}>Générer le rapport final (PDF)</Button>
              <Button style={{background : "red", marginLeft : 10}} onClick={clearSignature}>Effacer la signature</Button>
            </div>
          </ContentSection>
        )}
      </MainContent>
    </DashboardContainer>
  )
}

export default InternDashboard

