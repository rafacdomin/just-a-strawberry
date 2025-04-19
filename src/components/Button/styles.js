import styled from 'styled-components';

export const ButtonContainer = styled.div`
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

export const StyledButton = styled.button`
  background: #ff4069;
  border: none;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  padding: 16px 32px;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 4px 15px rgba(255, 64, 105, 0.3);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(255, 64, 105, 0.5);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(1px);
  }
`;