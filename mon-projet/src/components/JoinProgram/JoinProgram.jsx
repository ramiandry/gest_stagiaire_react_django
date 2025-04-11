import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const JoinSection = styled.section`
  padding: 4rem 0;
  background-color: #f8f9fa;
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;

  ${({ primary }) =>
    primary
      ? `background-color: #007bff; color: white;`
      : `background-color: #6c757d; color: white;`}

  &:hover {
    opacity: 0.8;
  }
`;

const JoinProgram = () => {
  const navigate = useNavigate();
  return (
    <JoinSection>
      <Container>
        <Title>Rejoignez notre programme de stages</Title>
        <Description>
          Postulez dès maintenant pour un stage enrichissant et développez vos
          compétences professionnelles avec nous.
        </Description>
        <ButtonContainer>
          <Button primary onClick={() => navigate("/candidature-stage")}>Postuler</Button>
          <Button onClick={() => navigate("/candidature-stage")}>En savoir plus</Button>
        </ButtonContainer>
      </Container>
    </JoinSection>
  );
};

export default JoinProgram;
