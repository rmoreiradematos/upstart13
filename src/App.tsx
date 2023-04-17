import React, { FC } from 'react';
import CityInput from './Components/CityInput.tsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  height: 100vh;
  background: linear-gradient(135deg, #83a4d4, #b6fbff);
`;
const App: FC = () => {

  return (
    <Container>
      <CityInput />
    </Container>
  );
};

export default App;