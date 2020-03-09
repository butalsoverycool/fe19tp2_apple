import React from 'react';
import styled from 'styled-components';

import AllTabs from './AllTabs';
import ActiveTabSettings from './ActiveTabSettings';
import HiddenCharts from './HiddenCharts';

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: -10rem;
  top: 200px;

  & > * {
    width: 15rem;
  }

  & * {
    transition-duration: 0.2s;
  }

  @media print {
    display: none;

    & * {
      display: none;
    }
  }
`;

const FloatMenu = props => {
  const { chartLen, disabledCharts } = props;
  return (
    <Container className="FloatMenu">
      <AllTabs chartLen={chartLen} />
      {chartLen > 0 && <ActiveTabSettings />}
      {disabledCharts && <HiddenCharts />}
    </Container>
  );
};

export default FloatMenu;
