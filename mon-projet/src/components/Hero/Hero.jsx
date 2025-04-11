"use client"

import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { FaArrowRight, FaInfoCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

const HeroSection = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                    url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
  text-align: center;
  padding: 150px 0 100px;
  overflow: hidden;
`

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(49, 130, 206, 0.8) 0%, rgba(128, 90, 213, 0.8) 100%);
  mix-blend-mode: overlay;
  z-index: 1;
`

const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 70px;
  }
  
  .shape-fill {
    fill: var(--color-white);
  }
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 20px;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: ${slideUp} 1s ease-out forwards;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  span {
    color: var(--color-accent);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background-color: var(--color-accent);
    }
  }
`

const HeroText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0;
  animation: ${slideUp} 1s ease-out 0.3s forwards;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  opacity: 0;
  animation: ${slideUp} 1s ease-out 0.6s forwards;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const Button = styled.button`
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-md);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:hover::after {
    animation: ripple 1s ease-out;
  }

  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }

  &.btn-primary {
    background-color: var(--color-primary);
    color: white;
  }

  &.btn-secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }

  .icon {
    transition: transform 0.3s ease;
  }

  &:hover .icon {
    transform: translateX(5px);
  }
`

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: ${float} 6s ease-in-out infinite;
  
  &:nth-child(1) {
    width: 100px;
    height: 100px;
    background-color: var(--color-primary);
    top: 10%;
    left: 10%;
    animation-duration: 8s;
  }
  
  &:nth-child(2) {
    width: 150px;
    height: 150px;
    background-color: var(--color-secondary);
    top: 20%;
    right: 15%;
    animation-duration: 10s;
    animation-delay: 1s;
  }
  
  &:nth-child(3) {
    width: 80px;
    height: 80px;
    background-color: var(--color-accent);
    bottom: 15%;
    left: 20%;
    animation-duration: 7s;
    animation-delay: 2s;
  }
`

const AnimatedArrow = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${float} 2s ease-in-out infinite;
  z-index: 3;
  cursor: pointer;
  
  svg {
    color: white;
    font-size: 2rem;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: scale(1.2);
  }
`

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null)

  const scrollToNext = () => {
    const nextSection = sectionRef.current.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <HeroSection ref={sectionRef} style={{ opacity: 0, transition: "opacity 1s ease-out" }}>
      <GradientOverlay />

      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>

      <Container>
        <HeroTitle>
          Bienvenue chez <span>Caisse d'Epargne</span>, votre partenaire de confiance
        </HeroTitle>
        <HeroText>
          À la Caisse d'Epargne, nous valorisons l'engagement, l'innovation et la responsabilité. Notre mission est de
          soutenir les jeunes talents en leur offrant des opportunités de stage enrichissantes et formatrices.
        </HeroText>
        <HeroButtons>
          <Button className="btn-primary" onClick={() => navigate("/candidature-stage")}>
            Postuler <FaArrowRight className="icon" />
          </Button>
          <Button className="btn-secondary" onClick={() => navigate("/candidature-stage")}>
            <FaInfoCircle /> En savoir plus
          </Button>
        </HeroButtons>
      </Container>

      <AnimatedArrow onClick={scrollToNext}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L12 18L17 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7L12 12L17 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </AnimatedArrow>

      <ShapeDivider>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </ShapeDivider>
    </HeroSection>
  )
}

export default Hero

