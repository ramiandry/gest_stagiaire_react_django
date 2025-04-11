import styled, { keyframes } from "styled-components"
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideInFromRight = keyframes`
  from {
    transform: translateX(30px);
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

const FooterSection = styled.footer`
  background: linear-gradient(135deg, var(--color-gray-900) 0%, var(--color-gray-800) 100%);
  color: white;
  padding: 5rem 0 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  }
`

const FooterBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-color: rgba(49, 130, 206, 0.05);
    bottom: -150px;
    right: -150px;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(128, 90, 213, 0.05);
    top: 100px;
    left: -100px;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`

const FooterColumn = styled.div`
  opacity: 0;
  
  &:nth-child(1) {
    animation: ${slideInFromLeft} 0.8s ease forwards;
    animation-delay: 0.1s;
  }
  
  &:nth-child(2) {
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.3s;
  }
  
  &:nth-child(3) {
    animation: ${fadeIn} 0.8s ease forwards;
    animation-delay: 0.5s;
  }
  
  &:nth-child(4) {
    animation: ${slideInFromRight} 0.8s ease forwards;
    animation-delay: 0.7s;
  }
  
  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: 600;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
      bottom: -8px;
      left: 0;
      border-radius: 2px;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 1rem;
  }

  a {
    color: var(--color-gray-300);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;

    &:hover {
      color: white;
      transform: translateX(5px);
    }
  }
`

const FooterLogo = styled.div`
  margin-bottom: 1.5rem;
  
  img {
    height: 50px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`

const FooterAbout = styled.p`
  color: var(--color-gray-300);
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 0.95rem;
`

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const SocialIcon = styled.a`
  color: white;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`

const FooterBottom = styled.div`
  margin-top: 4rem;
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: ${slideInFromBottom} 0.8s ease forwards;
  animation-delay: 0.9s;
  
  p {
    color: var(--color-gray-300);
    font-size: 0.95rem;
  }
  
  .heart {
    color: #E53E3E;
    display: inline-block;
    animation: pulse 1.5s infinite;
    margin: 0 0.25rem;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    color: var(--color-primary);
    font-size: 1.2rem;
    margin-top: 0.25rem;
  }
  
  div {
    color: var(--color-gray-300);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`

const Newsletter = styled.div`
  margin-top: 1.5rem;
  
  p {
    color: var(--color-gray-300);
    margin-bottom: 1rem;
    font-size: 0.95rem;
    line-height: 1.7;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input {
    padding: 0.75rem 1rem;
    border-radius: 6px;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    
    &::placeholder {
      color: var(--color-gray-300);
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-primary);
    }
  }
  
  button {
    padding: 0.75rem 1rem;
    border-radius: 6px;
    border: none;
    background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
  }
`

const Footer = () => {
  return (
    <FooterSection>
      <FooterBackground />
      <Container>
        <FooterGrid>
          <FooterColumn>
            <FooterLogo>
              <img
                src="./public/logo.jpg"
                alt="Caisse d'Epargne Logo"
              />
            </FooterLogo>
            <FooterAbout>
              Votre partenaire de confiance pour le développement des talents de demain. Nous nous engageons à offrir
              des opportunités de stage enrichissantes et formatrices.
            </FooterAbout>
            <SocialIcons>
              <SocialIcon href="#" aria-label="Facebook">
                <FaFacebook />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialIcon>
            </SocialIcons>
          </FooterColumn>

          <FooterColumn>
            <h3>Liens utiles</h3>
            <ul>
              <li>
                <a href="#">
                  <span>Notre entreprise</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Nos valeurs</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Carrières</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Termes et conditions</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Politique de confidentialité</span>
                </a>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>Ressources</h3>
            <ul>
              <li>
                <a href="#">
                  <span>Guide du stagiaire</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>FAQ</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Centre d'aide</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Témoignages</span>
                </a>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>Contact</h3>
            <ContactItem>
              <FaEnvelope />
              <div>contact@caisse-epargne.fr</div>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <div>+22 45 67 89</div>
            </ContactItem>
            <ContactItem>
              <FaMapMarkerAlt />
              <div>
                Tsaralalana
              </div>
            </ContactItem>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <p>
            &copy; {new Date().getFullYear()} Caisse d'Épargne. Tous droits réservés. Conçu avec
            <span className="heart">
              <FaHeart />
            </span>
            à Tsaralalana, Madagascar.
          </p>
        </FooterBottom>
      </Container>
    </FooterSection>
  )
}

export default Footer

