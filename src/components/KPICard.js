import React from 'react';
import InfoTooltip from './InfoTooltip';
import '../styles/KPICard.scss';

const KPICard = ({ title, value, unit, icon, tooltip }) => (
  <div className="kpi-card">

    <div className="kpi-card__wrapper"> 
      <div className="kpi-card__icon">{icon}</div>

      <div className="kpi-card__content"> 
      <h3 className="kpi-card__title">{title}</h3>
      </div>
    </div>
    <p className="kpi-card__value">
        {value}
        {unit && <span className="kpi-card__unit">{unit}</span>}
      </p>
    {tooltip && <InfoTooltip text={tooltip} />}
  </div>
);

export default KPICard;