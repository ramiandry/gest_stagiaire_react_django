"use client"

import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { FaClipboardCheck, FaUserGraduate, FaChartLine, FaCheckCircle } from "react-icons/fa"

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const FeaturesSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: rgba(49, 130, 206, 0.05);
    top: -150px;
    left: -150px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(128, 90, 213, 0.05);
    bottom: -100px;
    right: -100px;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  gap: 4rem;
  position: relative;
  z-index: 1;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`

const FeaturesContent = styled.div`
  flex: 1;
  opacity: 0;
  
  &.animated {
    animation: ${fadeInLeft} 0.8s ease forwards;
  }

  h2 {
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      bottom: -10px;
      left: 0;
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: var(--color-text-light);
    margin-bottom: 2rem;
    line-height: 1.8;
  }
`

const FeaturesList = styled.div`
  flex: 1;
`

const FeatureItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
  opacity: 0;
  
  &.animated {
    animation: ${fadeInRight} 0.8s ease forwards;
  }
  
  &:nth-child(1).animated {
    animation-delay: 0.2s;
  }
  
  &:nth-child(2).animated {
    animation-delay: 0.4s;
  }
  
  &:nth-child(3).animated {
    animation-delay: 0.6s;
  }
  
  &:hover {
    transform: translateX(10px);
    transition: transform 0.3s ease;
  }
`

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  margin-right: 1.5rem;
  color: var(--color-white);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.5s ease;
  position: relative;
  z-index: 1;
  box-shadow: var(--shadow-md);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 3px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  ${FeatureItem}:hover &::before {
    opacity: 1;
  }
  
  ${FeatureItem}:hover & {
    transform: rotateY(360deg);
    color: var(--color-white);
  }
`

const FeatureText = styled.div`
  h3 {
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-gray-800);
  }
  
  p {
    color: var(--color-text-light);
    line-height: 1.7;
  }
`

const FeatureTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: rgba(49, 130, 206, 0.1);
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`

const Features = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const itemRefs = useRef([])

  const features = [
    {
      title: "Gestion des candidatures simplifiée et efficace",
      description:
        "Recevez et gérez les candidatures en un clin d'œil grâce à notre interface intuitive et nos outils automatisés.",
      icon: <FaClipboardCheck />,
      tag: "Gestion simplifiée",
    },
    {
      title: "Attribution des stages en toute transparence",
      description:
        "Assignez des stages en fonction des compétences et des préférences pour garantir la meilleure expérience possible.",
      icon: <FaUserGraduate />,
      tag: "Transparence",
    },
    {
      title: "Suivi et évaluation des stagiaires simplifiés",
      description:
        "Évaluez les performances et le développement des stagiaires avec des outils de reporting détaillés et personnalisables.",
      icon: <FaChartLine />,
      tag: "Suivi de progression",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === contentRef.current) {
              entry.target.classList.add("animated")
            } else {
              entry.target.classList.add("animated")
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current)
      }

      itemRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, [])

  return (
    <FeaturesSection ref={sectionRef}>
      <Container>
        <FeaturesContent ref={contentRef}>
          <h2>Découvrez les fonctionnalités de notre application</h2>
          <p>
            Notre plateforme facilite la gestion des stagiaires en entreprise grâce à des outils innovants et intuitifs.
            Simplifiez votre processus de recrutement, assurez un suivi personnalisé de chaque stagiaire et optimisez
            leur parcours d'apprentissage avec nos solutions adaptées à vos besoins.
          </p>

          <div
            className="features-highlight"
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}
          >
            {["Simplicité", "Efficacité", "Innovation", "Personnalisation"].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: "rgba(49, 130, 206, 0.1)",
                  color: "var(--color-primary)",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                <FaCheckCircle />
                {item}
              </div>
            ))}
          </div>
        </FeaturesContent>

        <FeaturesList>
          {features.map((feature, index) => (
            <FeatureItem key={index} ref={(el) => (itemRefs.current[index] = el)}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureText>
                <FeatureTag>{feature.tag}</FeatureTag>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureText>
            </FeatureItem>
          ))}
        </FeaturesList>
      </Container>
    </FeaturesSection>
  )
}

export default Features

