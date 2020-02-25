import React from 'react';
/* import Birds from './birds' */
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../GlobalStyles';

const Landing = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        {/* <Birds /> */}
      </div>
    </ThemeProvider>
  )
}

export default Landing;
