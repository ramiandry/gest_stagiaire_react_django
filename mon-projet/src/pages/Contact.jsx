"use client"

import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa"

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
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const HeroSection = styled.section`
  position: relative;
  height: 400px;
  margin-bottom: 4rem;
  border-radius: 20px;
  overflow: hidden;
  animation: ${fadeIn} 1s ease-out;
`

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`

const ContentSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ContactForm = styled.form`
  animation: ${slideIn} 1s ease-out;
`

const FormTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #0066b3;
    outline: none;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #0066b3;
    outline: none;
  }
`

const SubmitButton = styled.button`
  background-color: #0066b3;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #004e8a;
  }
`

const ContactInfo = styled.div`
  animation: ${fadeIn} 1s ease-out;
`

const InfoTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`

const InfoCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  animation: ${float} 3s infinite ease-in-out;
  animation-delay: ${(props) => props.delay || "0s"};
`

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #0066b3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
`

const InfoText = styled.div`
  color: #555;
`

const InfoLabel = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`

const MapImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  margin-top: 2rem;
`

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Ajoutez ici la logique d'envoi du formulaire
    console.log("Form submitted:", formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <PageContainer>
      <HeroSection>
        <HeroImage
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1400&q=80"
          alt="Contact Us"
        />
        <HeroOverlay>
          <HeroTitle>Contactez-Nous</HeroTitle>
          <HeroSubtitle>Notre équipe est à votre disposition pour répondre à toutes vos questions</HeroSubtitle>
        </HeroOverlay>
      </HeroSection>

      <ContentSection>
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Envoyez-nous un message</FormTitle>
          <FormGroup>
            <Label htmlFor="name">Nom complet</Label>
            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subject">Sujet</Label>
            <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" name="message" value={formData.message} onChange={handleChange} required />
          </FormGroup>
          <SubmitButton type="submit">Envoyer le message</SubmitButton>
        </ContactForm>

        <ContactInfo>
          <InfoTitle>Informations de contact</InfoTitle>
          <InfoCard>
            <InfoItem delay="0.1s">
              <IconWrapper>
                <FaPhone />
              </IconWrapper>
              <InfoText>
                <InfoLabel>Téléphone</InfoLabel>
                +22 45 67 89
              </InfoText>
            </InfoItem>
            <InfoItem delay="0.2s">
              <IconWrapper>
                <FaEnvelope />
              </IconWrapper>
              <InfoText>
                <InfoLabel>Email</InfoLabel>
                contact@caisse-epargne.com
              </InfoText>
            </InfoItem>
            <InfoItem delay="0.3s">
              <IconWrapper>
                <FaMapMarkerAlt />
              </IconWrapper>
              <InfoText>
                <InfoLabel>Adresse</InfoLabel>
                Tsaralalana
              </InfoText>
            </InfoItem>
            <InfoItem delay="0.4s">
              <IconWrapper>
                <FaClock />
              </IconWrapper>
              <InfoText>
                <InfoLabel>Heures d'ouverture</InfoLabel>
                Lun - Ven: 8h00 - 16h30
              </InfoText>
            </InfoItem>
          </InfoCard>
          <MapImage
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1400&q=80"
            alt="Location"
          />
        </ContactInfo>
      </ContentSection>
    </PageContainer>
  )
}

export default Contact

