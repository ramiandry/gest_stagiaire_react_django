"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { FaBars, FaTimes, FaUserCircle, FaSearch } from "react-icons/fa"

const NavbarContainer = styled.nav`
  background-color: var(--color-white);
  box-shadow: var(--shadow-md);
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  
  &.scrolled {
    padding: 0.5rem 0;
    box-shadow: var(--shadow-lg);
  }
`

const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`

const NavbarLogo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-gray-800);
  
  img {
    height: 40px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-gray-800);
  transition: color 0.3s ease;
  z-index: 20;

  &:hover {
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    display: block;
  }
`

const NavbarMenu = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    background-color: var(--color-white);
    padding: 5rem 2rem 2rem;
    box-shadow: var(--shadow-xl);
    z-index: 10;
  }
`

const NavbarItem = styled.li`
  margin-left: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
    margin: 1rem 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`

const NavbarLink = styled.a`
  text-decoration: none;
  color: var(--color-gray-800);
  font-weight: 500;
  transition: color 0.3s ease;
  display: block;
  
  &:hover {
    color: var(--color-primary);
  }
`

const NavbarButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 2rem;
    flex-direction: column;
    align-items: flex-start;
  }
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &.btn-login {
    background-color: var(--color-primary);
    color: white;
  }

  &.btn-register {
    background-color: var(--color-secondary);
    color: white;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

const SearchButton = styled.button`
  background: none;
  border: none;
  color: var(--color-gray-800);
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 1rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
    transform: scale(1.1);
  }
`

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "visible"
    }

    return () => {
      document.body.style.overflow = "visible"
    }
  }, [isMenuOpen])

}

export default Navbar

