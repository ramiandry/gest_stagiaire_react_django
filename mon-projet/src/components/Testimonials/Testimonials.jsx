"use client"

import { useState, useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaLinkedin, FaTwitter } from "react-icons/fa"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideInFromBottom = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const TestimonialsSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2.4rem;
  opacity: 0;
  
  &.animated {
    animation: ${fadeIn} 0.8s ease forwards;
  }
  
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Description = styled.p`
  text-align: center;
  margin-bottom: 3.5rem;
  opacity: 0;
  font-size: 1.1rem;
  color: var(--color-text-light);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  &.animated {
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.2s;
  }
`

const TestimonialsWrapper = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
`

const TestimonialsSlider = styled.div`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: translateX(${(props) => props.translateValue}px);
  background-color: var(--color-white);
`

const TestimonialCard = styled.div`
  padding: 3rem;
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  
  &.animated {
    animation: ${slideIn} 0.8s ease forwards;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const QuoteIcon = styled.div`
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  opacity: 0.2;
`

const TestimonialStars = styled.div`
  color: #FFD700;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.25rem;
  font-size: 1.2rem;
`

const TestimonialQuote = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 2rem;
  line-height: 1.8;
  color: var(--color-gray-800);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid var(--color-gray-200);
  padding-top: 1.5rem;
`

const AuthorImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 1.5rem;
  object-fit: cover;
  border: 3px solid var(--color-primary);
  padding: 2px;
  background: white;
`

const AuthorInfo = styled.div`
  text-align: left;
  
  h4 {
    margin: 0;
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--color-gray-800);
  }
  
  p {
    margin: 0.25rem 0 0.5rem;
    color: var(--color-text-light);
    font-size: 0.95rem;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  
  a {
    color: var(--color-text-light);
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--color-primary);
      transform: translateY(-2px);
    }
  }
`

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1rem;
  opacity: 0;
  
  &.animated {
    animation: ${slideInFromBottom} 0.8s ease forwards;
    animation-delay: 0.6s;
  }
`

const SliderButton = styled.button`
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "var(--color-primary)" : "var(--color-gray-300)")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.active ? "var(--color-primary)" : "var(--color-gray-400)")};
    transform: scale(1.2);
  }
`

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [translateValue, setTranslateValue] = useState(0)
  const sliderRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const cardRefs = useRef([])
  const controlsRef = useRef(null)

  const testimonials = [
    {
      quote:
        "Mon stage à la Caisse d'Epargne a été une expérience incroyablement formatrice et inspirante. L'équipe m'a accueilli chaleureusement et m'a donné des responsabilités dès le début, ce qui m'a permis de développer rapidement mes compétences professionnelles.",
      author: "Alice Dupont",
      role: "Ancienne stagiaire en Finance",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      quote:
        "L'équipe m'a soutenu à chaque étape de mon parcours. J'ai pu développer de nouvelles compétences techniques et travailler sur des projets concrets qui ont eu un impact réel sur l'entreprise. Cette expérience a définitivement façonné ma carrière professionnelle.",
      author: "Marc Lefèvre",
      role: "Stagiaire en Développement Commercial",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      quote:
        "Une expérience professionnelle exceptionnelle qui m'a permis de grandir tant sur le plan personnel que professionnel. L'environnement de travail stimulant et les mentors bienveillants ont créé le cadre idéal pour mon développement. Je recommande vivement ce programme de stage.",
      author: "Sophie Martin",
      role: "Stagiaire en Marketing Digital",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
      linkedin: "#",
      twitter: "#",
    },
  ]

  const nextSlide = () => {
    if (currentIndex === testimonials.length - 1) return

    const cardWidth = sliderRef.current.offsetWidth
    setTranslateValue(-(currentIndex + 1) * cardWidth)
    setCurrentIndex(currentIndex + 1)
  }

  const prevSlide = () => {
    if (currentIndex === 0) return

    const cardWidth = sliderRef.current.offsetWidth
    setTranslateValue(-(currentIndex - 1) * cardWidth)
    setCurrentIndex(currentIndex - 1)
  }

  const goToSlide = (index) => {
    const cardWidth = sliderRef.current.offsetWidth
    setTranslateValue(-index * cardWidth)
    setCurrentIndex(index)
  }

  useEffect(() => {
    const handleResize = () => {
      const cardWidth = sliderRef.current.offsetWidth
      setTranslateValue(-currentIndex * cardWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (titleRef.current) observer.observe(titleRef.current)
    if (descriptionRef.current) observer.observe(descriptionRef.current)
    if (controlsRef.current) observer.observe(controlsRef.current)

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current)
      if (descriptionRef.current) observer.unobserve(descriptionRef.current)
      if (controlsRef.current) observer.unobserve(controlsRef.current)

      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <TestimonialsSection>
      <Container>
        <Title ref={titleRef}>Témoignages clients</Title>
        <Description ref={descriptionRef}>
          Les stagiaires partagent leur expérience enrichissante au sein de notre entreprise. Découvrez leurs parcours
          et leurs réussites personnelles.
        </Description>

        <TestimonialsWrapper>
          <TestimonialsSlider ref={sliderRef} translateValue={translateValue}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} ref={(el) => (cardRefs.current[index] = el)}>
                <QuoteIcon>
                  <FaQuoteLeft />
                </QuoteIcon>
                <TestimonialStars>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </TestimonialStars>
                <TestimonialQuote>"{testimonial.quote}"</TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorImage src={testimonial.avatar} alt={testimonial.author} />
                  <AuthorInfo>
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                    <SocialLinks>
                      <a href={testimonial.linkedin} aria-label="LinkedIn">
                        <FaLinkedin />
                      </a>
                      <a href={testimonial.twitter} aria-label="Twitter">
                        <FaTwitter />
                      </a>
                    </SocialLinks>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsSlider>
        </TestimonialsWrapper>

        <SliderDots>
          {testimonials.map((_, index) => (
            <SliderDot
              key={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </SliderDots>

        <SliderControls ref={controlsRef}>
          <SliderButton onClick={prevSlide} disabled={currentIndex === 0} aria-label="Previous testimonial">
            <FaChevronLeft />
          </SliderButton>
          <SliderButton
            onClick={nextSlide}
            disabled={currentIndex === testimonials.length - 1}
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </SliderButton>
        </SliderControls>
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials

