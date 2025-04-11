import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  :root {
    --color-primary: #3182CE;
    --color-primary-dark: #2C5282;
    --color-secondary: #805AD5;
    --color-secondary-dark: #6B46C1;
    --color-accent: #F6AD55;
    --color-background: #F7FAFC;
    --color-text: #2D3748;
    --color-text-light: #718096;
    --color-white: #FFFFFF;
    --color-gray-100: #F7FAFC;
    --color-gray-200: #EDF2F7;
    --color-gray-300: #E2E8F0;
    --color-gray-800: #2D3748;
    --color-gray-900: #1A202C;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--color-text);
    background-color: var(--color-background);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-primary-dark);
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .btn {
    display: inline-block;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    font-size: 16px;
  }

  .btn-primary {
    background-color: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    background-color: var(--color-primary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .btn-secondary {
    background-color: var(--color-secondary);
    color: white;
  }

  .btn-secondary:hover {
    background-color: var(--color-secondary-dark);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  /* Animation keyframes */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromRight {
    0% {
      transform: translateX(50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromTop {
    0% {
      transform: translateY(-50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`

export default GlobalStyle

