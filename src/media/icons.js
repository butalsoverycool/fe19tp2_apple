import React from 'react';
import styled from 'styled-components';

import deleteCross from './icon_delete_tab.png';
import pie from './icon_pie.png';
import briefcase from './icon_briefcase.png';
import settings from './icon_settings.png';
import check from './icon_check.png';
import visible from './icon_visible.png';
import hidden from './icon_hidden.png';

const IconStyled = styled.img`
  width: ${props => props.w || '1.5rem'};
  max-width: ${props => props.maxW || '1.5rem'};
`;

export const icons = {
  deleteCross,
  pie,
  briefcase,
  settings,
  check,
  visible,
  hidden
};

const IconTemplate = props => {
  return (
    <>
      <IconStyled
        src={props.src}
        w={props.w || null}
        maxW={props.maxW || null}
      />
    </>
  );
};

export default IconTemplate;
