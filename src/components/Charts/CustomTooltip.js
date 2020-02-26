import React from 'react';

const CustomTooltip = ({ active, payload, label, unit, sector }) => {
  const Datamarkers = () =>
    payload.map((marker, nth) => (
      <p key={nth}>
        {label}: {marker.value} {unit}
        {sector}
      </p>
    ));

  if (active) {
    return (
      <div className='tooltip'>
        <p className='label'>
          <Datamarkers />
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
