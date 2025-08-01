
import React from 'react';
import './SectionCard.css';

function SectionCard({ title, imageSrc, children }) {
    return (
        <div className="section-card">

            {imageSrc && <img src={imageSrc} alt={`${title} icon`} className="section-card-image" />}
            <div className="section-card-content">

                <h3 className="section-card-title">{title}</h3>

                {children}
            </div>
        </div>
    );
}

export default SectionCard;