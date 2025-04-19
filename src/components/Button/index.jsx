import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ButtonContainer, StyledButton } from './styles';

export const Button = () => {
  const buttonRef = useRef();

  const handleHover = () => {
    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleHoverOut = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleClick = () => {
    // Animação do botão
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
    });

    // Dispara evento para fazer o morango pular
    window.dispatchEvent(new Event('strawberry-jump'));
  };

  return (
    <ButtonContainer>
      <StyledButton
        ref={buttonRef}
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
        onClick={handleClick}
      >
        Clique!
      </StyledButton>
    </ButtonContainer>
  );
};