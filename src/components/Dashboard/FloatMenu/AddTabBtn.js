import React from 'react';
import { withDashboard } from '../context';
import { Btn } from './styledElems';

const AddTabBtn = props => {
  const { newTab } = props.dashboard.setters;

  return (
    <>
      <Btn weight="700" onClick={newTab}>
        +
      </Btn>
    </>
  );
};

export default withDashboard(AddTabBtn);
