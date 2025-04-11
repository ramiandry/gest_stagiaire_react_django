"use client"
import styled, { keyframes, createGlobalStyle } from "styled-components"
import { FaShieldAlt, FaBriefcase, FaMobileAlt, FaGlobeAmericas } from "react-icons/fa"

// Global styles
const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #0066b3;
    --color-primary-dark: #004e8a;
    --color-secondary: #e4003a;
    --color-white: #ffffff;
    --color-gray-100: #f7fafc;
    --color-gray-200: #edf2f7;
    --color-gray-300: #e2e8f0;
    --color-gray-400: #cbd5e0;
    --color-gray-500: #a0aec0;
    --color-gray-600: #718096;
    --color-gray-700: #4a5568;
    --color-gray-800: #2d3748;
    --color-gray-900: #1a202c;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`

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
  text-align: center;
  padding: 4rem 0;
  animation: ${fadeIn} 1s ease-out;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--color-gray-800);
  margin-bottom: 1.5rem;
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-gray-600);
  max-width: 600px;
  margin: 0 auto 2rem;
`

const HeroImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`

const ServiceCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-10px);
  }
`

const ServiceImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const ServiceContent = styled.div`
  padding: 1.5rem;
`

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--color-gray-800);
  margin-bottom: 1rem;
`

const ServiceDescription = styled.p`
  color: var(--color-gray-600);
  line-height: 1.6;
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 4rem 0;
`

const GalleryItem = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 1;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover img {
    transform: scale(1.1);
  }

  &:hover .overlay {
    opacity: 1;
  }
`

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`

const FeatureSection = styled.section`
  padding: 4rem 0;
  background: var(--color-gray-100);
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const FeatureItem = styled.div`
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
  animation-delay: ${(props) => props.delay || "0s"};
`

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--color-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  animation: ${pulse} 3s infinite ease-in-out;
`

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-gray-800);
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  color: var(--color-gray-600);
  line-height: 1.6;
`

const PlusInformation = () => {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <HeroSection>
          <HeroTitle>Découvrez Nos Services Financiers</HeroTitle>
          <HeroSubtitle>Des solutions adaptées à tous vos besoins bancaires et financiers</HeroSubtitle>
          <HeroImage
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
            alt="Services bancaires"
          />
        </HeroSection>

        <ServicesGrid>
          <ServiceCard delay="0.2s">
            <ServiceImage
              src="https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=600&q=80"
              alt="Épargne"
            />
            <ServiceContent>
              <ServiceTitle>Solutions d'Épargne</ServiceTitle>
              <ServiceDescription>
                Optimisez votre épargne avec nos solutions personnalisées et sécurisées.
              </ServiceDescription>
            </ServiceContent>
          </ServiceCard>

          <ServiceCard delay="0.4s">
            <ServiceImage
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
              alt="Investissement"
            />
            <ServiceContent>
              <ServiceTitle>Investissements</ServiceTitle>
              <ServiceDescription>
                Diversifiez votre portefeuille avec nos conseils d'experts en investissement.
              </ServiceDescription>
            </ServiceContent>
          </ServiceCard>

          <ServiceCard delay="0.6s">
            <ServiceImage
              src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=600&q=80"
              alt="Assurance"
            />
            <ServiceContent>
              <ServiceTitle>Assurances</ServiceTitle>
              <ServiceDescription>Protégez votre avenir avec nos solutions d'assurance complètes.</ServiceDescription>
            </ServiceContent>
          </ServiceCard>
        </ServicesGrid>

        <FeatureSection>
          <FeatureGrid>
            <FeatureItem delay="0.2s">
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <FeatureTitle>Sécurité Maximale</FeatureTitle>
              <FeatureDescription>Protection avancée de vos données et transactions</FeatureDescription>
            </FeatureItem>

            <FeatureItem delay="0.4s">
              <FeatureIcon>
                <FaBriefcase />
              </FeatureIcon>
              <FeatureTitle>Expertise Financière</FeatureTitle>
              <FeatureDescription>Conseillers expérimentés à votre service</FeatureDescription>
            </FeatureItem>

            <FeatureItem delay="0.6s">
              <FeatureIcon>
                <FaMobileAlt />
              </FeatureIcon>
              <FeatureTitle>Services Digitaux</FeatureTitle>
              <FeatureDescription>Gestion de vos comptes en ligne 24/7</FeatureDescription>
            </FeatureItem>

            <FeatureItem delay="0.8s">
              <FeatureIcon>
                <FaGlobeAmericas />
              </FeatureIcon>
              <FeatureTitle>Présence Internationale</FeatureTitle>
              <FeatureDescription>Un réseau mondial à votre disposition</FeatureDescription>
            </FeatureItem>
          </FeatureGrid>
        </FeatureSection>

        <GalleryGrid>
          {[
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
          ].map((src, index) => (
            <GalleryItem key={index} delay={`${0.2 * index}s`}>
              <GalleryImage src={src} alt={`Gallery image ${index + 1}`} />
              <GalleryOverlay className="overlay">Voir plus</GalleryOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </PageContainer>
    </>
  )
}

export default PlusInformation

