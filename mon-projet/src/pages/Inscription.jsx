"use client"

import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"

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

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
`

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1200px;
  width: 100%;
  background: var(--color-white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const ImageSection = styled.div`
  position: relative;
  min-height: 400px;
  background: url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 102, 179, 0.9), rgba(0, 78, 138, 0.8));
  }

  @media (max-width: 968px) {
    min-height: 300px;
  }
`

const ImageContent = styled.div`
  position: relative;
  color: white;
  text-align: center;
  animation: ${fadeIn} 1s ease-out;
`

const ImageTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const ImageText = styled.p`
  font-size: 1.1rem;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`

const FormSection = styled.div`
  padding: 3rem 2rem;
  animation: ${slideIn} 1s ease-out;
`

const FormTitle = styled.h1`
  font-size: 2rem;
  color: var(--color-gray-800);
  margin-bottom: 2rem;
  text-align: center;
`

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-gray-700);
  font-size: 0.9rem;
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid var(--color-gray-300);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px rgba(0, 102, 179, 0.1);
    outline: none;
  }

  &::placeholder {
    color: var(--color-gray-400);
  }
`

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-500);
  transition: color 0.3s ease;

  ${Input}:focus + & {
    color: var(--color-primary);
  }
`

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-gray-500);
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary);
  }
`

const ErrorMessage = styled.span`
  color: var(--color-secondary);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: gray;
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
`

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--color-gray-600);

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary-dark);
    }
  }
`

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis"
    }

    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      // Traitement du formulaire
      console.log("Formulaire soumis:", formData)
    } else {
      setErrors(newErrors)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <PageContainer>
      <FormContainer>
        <ImageSection>
          <ImageContent>
            <ImageTitle>Bienvenue</ImageTitle>
            <ImageText>
              Rejoignez-nous pour accéder à nos services bancaires premium et gérer votre argent en toute sécurité.
            </ImageText>
          </ImageContent>
        </ImageSection>

        <FormSection>
          <FormTitle>Créer un compte</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="nom">Nom</Label>
              <InputWrapper>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="Votre nom"
                  value={formData.nom}
                  onChange={handleChange}
                />
                <InputIcon>
                  <FaUser />
                </InputIcon>
              </InputWrapper>
              {errors.nom && <ErrorMessage>{errors.nom}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="prenom">Prénom</Label>
              <InputWrapper>
                <Input
                  type="text"
                  id="prenom"
                  name="prenom"
                  placeholder="Votre prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                />
                <InputIcon>
                  <FaUser />
                </InputIcon>
              </InputWrapper>
              {errors.prenom && <ErrorMessage>{errors.prenom}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
              </InputWrapper>
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Mot de passe</Label>
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
              {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <InputWrapper>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <PasswordToggle type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </InputWrapper>
              {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
            </FormGroup>

            <SubmitButton type="submit">S'inscrire</SubmitButton>

            <LoginLink>
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </LoginLink>
          </Form>
        </FormSection>
      </FormContainer>
    </PageContainer>
  )
}

export default Inscription

