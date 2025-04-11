"use client"

import { useState, useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { FaSearch, FaUpload, FaBriefcase, FaClock, FaMapMarkerAlt, FaBuilding } from "react-icons/fa"
import useFetchStage from "../hooks/useFetchStage"
import useApplyStage from "../hooks/useApplyStage"
import { toast } from "react-toastify"
import useApplyStageUserExist from "../hooks/useApplyStageUserExist"
import useFetchStagiaire from "../hooks/useFetchStagiaire"

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  animation: ${fadeIn} 1s ease-out;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  padding: 4rem 2rem;
  border-radius: 15px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center/cover;
    opacity: 0.2;
    z-index: 0;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const SearchSection = styled.div`
  margin: -2rem auto 3rem;
  max-width: 700px;
  position: relative;
  z-index: 2;
  animation: ${slideIn} 0.8s ease-out;
`

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: var(--color-white);
  border-radius: 50px;
  padding: 1rem 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  svg {
    color: var(--color-primary);
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  font-size: 1.1rem;
  padding: 0.5rem;
  
  &:focus {
    outline: none;
  }
`

const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const OfferCard = styled.div`
  background: var(--color-white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`

const OfferImage = styled.div`
  height: 200px;
  background: url(${(props) => props.image}) center/cover;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  }
`

const OfferContent = styled.div`
  padding: 1.5rem;
`

const OfferTitle = styled.h3`
  font-size: 1.4rem;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
`

const OfferCompany = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gray-800);
  font-weight: 500;
  margin-bottom: 1rem;

  svg {
    margin-right: 0.5rem;
  }
`

const OfferDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--color-gray-700);

  svg {
    margin-right: 0.5rem;
    color: var(--color-primary);
  }
`

const ApplyButton = styled.button`
  width: 100%;
  background: var(--color-primary);
  color: red;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }

  svg {
    animation: ${pulse} 2s infinite;
  }
`

// Formulaire de candidature
const ApplicationForm = styled.form`
  background: var(--color-white);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: var(--color-gray-900);
  margin-bottom: 2rem;
  text-align: center;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-gray-800);
  font-weight: 500;
`

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`

const FileUpload = styled.div`
  border: 2px dashed var(--color-gray-300);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
    background: var(--color-gray-100);
  }

  input {
    display: none;
  }
`

const UploadIcon = styled(FaUpload)`
  font-size: 2rem;
  color: var(--color-gray-400);
  margin-bottom: 1rem;
`

const SubmitButton = styled.button`
  width: 100%;
  background: var(--color-primary);
  color: red;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-primary-dark);
    transform: translateY(-2px);
  }
`

// Données fictives
/*const offers = [
  {
    id: 1,
    title: "Stage Développeur Frontend",
    company: "Caisse d'Epargne",
    location: "Tananarive",
    duration: "6 mois",
    salary: "10.000 Ariary/mois",
    description: "Stage en développement web frontend avec React et TypeScript.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    title: "Stage Marketing Digital",
    company: "Caisse d'Epargne",
    location: "Majunga",
    duration: "4 mois",
    salary: "10.000 Ariary/mois",
    description: "Stage en marketing digital et stratégie de communication.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "Stage en Finance ",
    company: "Caisse d'Epargne",
    location: "Tamatave",
    duration: "4 mois",
    salary: "10.000 Ariary/mois",
    description: "Stage en marketing digital et stratégie de communication.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  // plus d'offre
]*/

function CandidatureStage() {
  const [offers, setOffers] = useState([])
  const [stagiaires, setStagiaires] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredOffers, setFilteredOffers] = useState(offers)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const inputCv = useRef(null);
  const inputLm = useRef(null);
  const { data, fetchStage } = useFetchStage()
  const {createUser, data: dataUser} = useApplyStage()
  const {applyStageUserExist} = useApplyStageUserExist()
  const {fetchStagiaire, data: dataStagiaire} = useFetchStagiaire()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    dateDebut: "",
    dateFin: "",
    cv: null,
    lm: null,
  })

  useEffect(() => {
    const results = offers.filter(
      (offer) =>
        offer.mission.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredOffers(results)
  }, [searchTerm, data])
  useEffect(() => {
    if (data) {
      console.log("tafiditra")
      setOffers(data.filter(dt=>dt.statut == 1))
      setFilteredOffers(data.filter(dt=>dt.statut == 1))
    }else{
      fetchStage()
    }
    console.log(data)
  }, [data])

  useEffect(() => {
      if(dataStagiaire){
        setStagiaires(dataStagiaire)
      }else{
        fetchStagiaire()
      }
  }, [dataStagiaire])
  
  
  const handleApply = (offer) => {
    setSelectedOffer(offer)
    setShowApplicationForm(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty required fields
    if (!formData.name || !formData.email || !formData.dateDebut || !formData.dateFin || !formData.cv || !formData.lm) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }
  
    // Check file validation again
    if (!formData.cv || !formData.lm) {
      toast.error("Veuillez uploader votre CV et votre lettre de motivation.");
      return;
    }
  
    try {
      
      const today = new Date().toISOString().split("T")[0];
      const forms = new FormData();
      forms.append("nom", formData.name);
      forms.append("email", formData.email);
      forms.append("role", "stagiaire");
      forms.append("password", "CEM"+new Date().toISOString() + selectedOffer.id.toString()  )
      forms.append("message", formData.message);
      forms.append("dateDebut", new Date(formData.dateDebut).toISOString().split("T")[0]);
      forms.append("dateFin", new Date(formData.dateFin).toISOString().split("T")[0]);
      forms.append("cv", formData.cv);
      forms.append("lettreMotivation", formData.lm);
      forms.append("stage", selectedOffer.id);
      forms.append("departement", selectedOffer.departement);
      forms.append("dateSoumission", today);

      let search=stagiaires.find((e)=>e.email.trim() == formData.email.trim())
      console.log(search)
      if(!search){
        await createUser(forms);
        fetchStagiaire()
      }{
        await applyStageUserExist(forms, search.id)
      }
  
      toast.success("Votre candidature a été soumise avec succès !");
      
      setShowApplicationForm(false);
      setFormData({
        name: "",
        email: "",
        message: "",
        dateDebut: "",
        dateFin: "",
        cv: null,
        lm: null,
      });
  
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la soumission de la candidature. Veuillez réessayer.");
    }
  };
  
  
  const handleFileChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.target.files[0],
    })
  }


  const handleFocusCv = () => {
    inputCv.current.click();
  };
  const handleFocusLm = () => {
    inputLm.current.click();
  };

  return (
    <PageContainer>
      <Header>
        <Title>Offres de Stage</Title>
        <Description>
          Découvrez nos opportunités de stage et rejoignez une équipe dynamique. Postulez en ligne et démarrez votre
          carrière avec nous.
        </Description>
      </Header>

      <SearchSection>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Rechercher une offre de stage..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </SearchSection>

      <OffersGrid>
        {filteredOffers.map((offer) => (
          <OfferCard key={offer.id}>
            <OfferImage image={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"} />
            <OfferContent>
              <OfferTitle>{offer.mission}</OfferTitle>
              <OfferCompany>
                <FaBuilding />
                {offer.departement}
              </OfferCompany>
              <OfferDetails>
                {/* <DetailItem>
                  <FaMapMarkerAlt />
                  {offer.location}
                </DetailItem> */}
                <DetailItem>
                  <FaClock />
                  {offer.duree} mois
                </DetailItem>
                <DetailItem>
                  <FaBriefcase />
                  {offer.renumeration} Ariary/mois
                </DetailItem>
              </OfferDetails>
              <ApplyButton onClick={() => handleApply(offer)}>
                Postuler maintenant
                <FaUpload />
              </ApplyButton>
            </OfferContent>
          </OfferCard>
        ))}
      </OffersGrid>

      {showApplicationForm && selectedOffer && (
        <ApplicationForm onSubmit={handleSubmit} encType="multipart/form-data">
          <FormTitle>Candidature pour : {selectedOffer.mission}</FormTitle>

          <FormGroup>
            <Label>Nom Complet</Label>
            <Input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Date de début de stage</Label>
            <Input
              type="date"
              required
              value={formData.dateDebut}
              onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Date de fin de stage</Label>
            <Input
              type="date"
              required
              value={formData.dateFin}
              onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Message de motivation</Label>
            <TextArea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label>CV (PDF)</Label>
            <FileUpload onClick={handleFocusCv}>
              <input type="file" accept=".pdf" ref={inputCv} required onChange={(e) => handleFileChange(e, "cv")} />
              <UploadIcon />
              <p>{formData.cv ? formData.cv.name : "Cliquez pour uploader votre CV"}</p>
            </FileUpload>
          </FormGroup>

          <FormGroup>
            <Label>Lettre de motivation (PDF)</Label>
            <FileUpload onClick={handleFocusLm}>
              <input type="file" accept=".pdf" ref={inputLm} onChange={(e) => handleFileChange(e, "lm")} />
              <UploadIcon />
              <p>
                {formData.lm ? formData.lm.name : "Cliquez pour uploader votre lettre de motivation"}
              </p>
            </FileUpload>
          </FormGroup>

          <SubmitButton type="submit">Envoyer ma candidature</SubmitButton>
        </ApplicationForm>
      )}
    </PageContainer>
  )
}

export default CandidatureStage

