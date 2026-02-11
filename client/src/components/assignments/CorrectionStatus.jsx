import React from 'react';

const CorrectionStatus = ({ status }) => {
    return (
        <div className="correction-status">
            <h3>Statut de Correction</h3>
            <p>{status === 'pending' ? 'À corriger' : 'Corrigé'}</p>
        </div>
    );
};

export default CorrectionStatus;