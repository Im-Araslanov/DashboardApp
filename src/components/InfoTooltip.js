import React, { useState } from 'react';
import '../styles/InfoTooltip.scss';

const InfoTooltip = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="info-tooltip">
      <button
        className="info-tooltip__icon"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        ?
      </button>
      {isVisible && <div className="info-tooltip__text">{text}</div>}
    </div>
  );
};

export default InfoTooltip;