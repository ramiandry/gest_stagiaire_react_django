"use client"

import { useState } from "react"
import styled, { keyframes } from "styled-components"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import useFetchOneUser from "../hooks/useFetchOneUser"
import { toast } from "react-toastify"


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
  max-width: 1000px;
  width: 100%;
  background: var(--color-white);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ImageSection = styled.div`
  position: relative;
  min-height: 400px;
  background: url('https://images.unsplash.com/photo-1616514197671-15d99ce7a6f8?auto=format&fit=crop&w=800&q=80') center/cover;
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

  @media (max-width: 768px) {
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

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: var(--color-primary);
  font-size: 0.9rem;
  text-decoration: none;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--color-primary-dark);
  }
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

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--color-gray-600);

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-primary-dark);
    }
  }
`

const SocialLogin = styled.div`
  margin-top: 2rem;
  text-align: center;
`

const SocialDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: var(--color-gray-300);
  }

  span {
    padding: 0 1rem;
    color: var(--color-gray-500);
    font-size: 0.9rem;
  }
`

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-gray-300);
  border-radius: 8px;
  background-color: gray;
  color: var(--color-gray-700);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-400);
  }
`

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const {fetchOneUser, data} = useFetchOneUser()

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!formData.email || !formData.password){
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return
    }
    try {
      await fetchOneUser(formData)
    } catch (error) {
      console.log(error)
    }
    // Redirection directe vers le tableau de bord sans vérification
    //navigate("/dashboard")

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
            <ImageTitle>Bon retour!</ImageTitle>
            <ImageText>
              Connectez-vous pour accéder à votre espace personnel et suivre votre progression de stage.
            </ImageText>
          </ImageContent>
        </ImageSection>

        <FormSection>
          <FormTitle>Connexion</FormTitle>
          <Form onSubmit={handleSubmit}>
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

            <ForgotPassword to="/reset-password">Mot de passe oublié ?</ForgotPassword>

            <SubmitButton type="submit">Se connecter</SubmitButton>

            <RegisterLink>
              {/* Pas encore de compte ?<Link to="/inscription">S'inscrire</Link> */}
            </RegisterLink>
          </Form>
        </FormSection>
      </FormContainer>
    </PageContainer>
  )
}

export default Login

