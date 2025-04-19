import styled from 'styled-components';

export const SceneContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #1a1a1a;
  background: radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 100%);
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;